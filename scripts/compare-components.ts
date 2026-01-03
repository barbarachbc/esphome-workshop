import * as fs from "fs";
import * as path from "path";
import {
  extractComponentsFromContent,
  __dirname as scriptsDir,
} from "./extract-components.ts";

const COMPONENTS_DIR = path.join(scriptsDir, "../src/content/components");

function normalizeComponentName(component: string, platform?: string) {
  if (platform) return `${component.replace(/_/g, "-")}-${platform.replace(/_/g, "-")}`;
  return component.replace(/_/g, "-");
}

function getComponentFiles(): Set<string> {
  return new Set(
    fs.readdirSync(COMPONENTS_DIR)
      .filter(f => f.endsWith(".md"))
      .map(f => f.replace(/\.md$/, ""))
  );
}

// Map: component[-platform] => Set<device or project>
function flattenExtractedComponents(content: Record<string, Record<string, Set<string>>>, type: "device"|"project"): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const [item, comps] of Object.entries(content)) {
    for (const [comp, platforms] of Object.entries(comps)) {
      if (platforms.size === 0) {
        const key = normalizeComponentName(comp);
        if (!map.has(key)) map.set(key, new Set());
        map.get(key)!.add(item);
      } else {
        for (const plat of platforms) {
          const key = normalizeComponentName(comp, plat);
          if (!map.has(key)) map.set(key, new Set());
          map.get(key)!.add(item);
        }
      }
    }
  }
  return map;
}

function main() {
  // 1. Load extracted components from both devices and projects
  const { devices, projects } = extractComponentsFromContent();

  // 2. List all component files
  const componentFiles = getComponentFiles();

  // 3. Flatten extracted components for devices and projects
  const usedDeviceComponents = flattenExtractedComponents(devices, "device");
  const usedProjectComponents = flattenExtractedComponents(projects, "project");

  // Merge all used components
  const allUsedComponents = new Set([
    ...Array.from(usedDeviceComponents.keys()),
    ...Array.from(usedProjectComponents.keys()),
  ]);

  // 4. Report 1: component files not found in any device or project
  const unusedComponentFiles = Array.from(componentFiles).filter(f => !allUsedComponents.has(f));

  // 5. Report 2: components (or platforms) for which file does not exist
  const missingComponentFiles = Array.from(allUsedComponents).filter(f => !componentFiles.has(f));

  // 6. Report 3: for each component, list devices/projects

  // Output
  console.log("# 1. Component .md files not found in any device or project");
  unusedComponentFiles.forEach(f => console.log(`- ${f}.md`));
  console.log("\n# 2. Components/platforms for which file does not exist");
  missingComponentFiles.forEach(f => console.log(`- ${f}.md`));

  console.log("\n# 3. Components used in devices");
  for (const [comp, devices] of usedDeviceComponents.entries()) {
    console.log(`${comp}`);
    for (const dev of devices) {
      console.log(`  - ${dev}`);
    }
    console.log();
  }

  console.log("# 4. Components used in projects");
  for (const [comp, projects] of usedProjectComponents.entries()) {
    console.log(`${comp}`);
    for (const proj of projects) {
      console.log(`  - ${proj}`);
    }
    console.log();
  }
}

main();