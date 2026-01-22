#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

import { fileURLToPath } from "url";
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DEVICES_DIR = path.join(__dirname, "../src/content/devices");
export const PROJECTS_DIR = path.join(__dirname, "../src/content/projects");
export const EXCLUDE = new Set(["esphome", "logger", "substitutions", "esp32", "esp8266"]);

export function extractYamlBlocks(mdText: string): string[] {
  const regex = /```yaml([\s\S]*?)```/g;
  const blocks: string[] = [];
  let match;
  while ((match = regex.exec(mdText))) {
    blocks.push(match[1]);
  }
  return blocks;
}

export function extractAstroEmbedPaths(mdText: string): string[] {
  const regex = /<!--\s*astro-embed:\s*([^\s]+)\s*-->/g;
  const paths: string[] = [];
  let match;
  while ((match = regex.exec(mdText))) {
    paths.push(match[1]);
  }
  return paths;
}

class CustomTag {
  type: any;
  data: any;
  constructor(type : any, data: any) {
    this.type = type;
    this.data = data;
  }
}

//handle unknown tags
const tags = [ 'scalar', 'sequence', 'mapping' ].map(function (kind) {
// first argument here is a prefix, so this type will handle anything starting with !
  return new yaml.Type('!', {
    kind: kind,
    multi: true,
    representName: function (object : any) {
      return object.type;
    },
    represent: function (object: any) {
      return object.data;
    },
    instanceOf: CustomTag,
    construct: function (data : any, type : any) {
      return new CustomTag(type, data);
    }
  });
});
const SCHEMA = yaml.DEFAULT_SCHEMA.extend(tags);

export function parseComponents(yamlObj: any): Record<string, Set<string>> {
  const result: Record<string, Set<string>> = {};
  for (const key in yamlObj) {
    if (EXCLUDE.has(key)) continue;
    const value = yamlObj[key];
    // Always add the key as a component
    if (!result[key]) result[key] = new Set();

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === "object" && "platform" in item) {
          result[key].add(item.platform);
        }
      }
    } else if (value && typeof value === "object") {
      if ("platform" in value) {
        result[key].add(value.platform);
      }
      // Also handle nested objects (e.g., font: { file: ... })
      // If no platform, just keep the component name
    } else {
      // Primitive value (string, number, boolean)
      // Just keep the component name
    }
  }
  return result;
}

export function extractComponentsFromContent(): {
  devices: Record<string, Record<string, Set<string>>>;
  projects: Record<string, Record<string, Set<string>>>;
} {
  const deviceSummary: Record<string, Record<string, Set<string>>> = {};
  const deviceFiles = fs.readdirSync(DEVICES_DIR).filter(f => f.endsWith(".md"));
  for (const fname of deviceFiles) {
    const filePath = path.join(DEVICES_DIR, fname);
    const mdText = fs.readFileSync(filePath, "utf-8");
    const yamlBlocks = extractYamlBlocks(mdText);
    const deviceName = fname.replace(/\.md$/, "");
    const deviceComponents: Record<string, Set<string>> = {};
    for (const block of yamlBlocks) {
      try {
        const yamlObj = yaml.load(block, {schema: SCHEMA});
        if (yamlObj && typeof yamlObj === "object") {
          const comps = parseComponents(yamlObj);
          for (const comp in comps) {
            if (!deviceComponents[comp]) deviceComponents[comp] = new Set();
            comps[comp].forEach(platform => deviceComponents[comp].add(platform));
          }
        }
      } catch(ex) {
        console.warn(`Device error ${ex}`);
      }
    }
    if (Object.keys(deviceComponents).length > 0) {
      deviceSummary[deviceName] = deviceComponents;
    }
  }

  const projectSummary: Record<string, Record<string, Set<string>>> = {};
  const projectFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".md"));
  for (const fname of projectFiles) {
    const filePath = path.join(PROJECTS_DIR, fname);
    const mdText = fs.readFileSync(filePath, "utf-8");
    const yamlBlocks = extractYamlBlocks(mdText);
    const projectName = fname.replace(/\.md$/, "");
    const projectComponents: Record<string, Set<string>> = {};

    // Process inline YAML blocks
    for (const block of yamlBlocks) {
      try {

        const yamlObj = yaml.load(block, {schema: SCHEMA});
        // For projects, only process YAML blocks that contain 'esphome:' at top level
        if (yamlObj && typeof yamlObj === "object" && "esphome" in yamlObj) {
          const comps = parseComponents(yamlObj);
          for (const comp in comps) {
            if (!projectComponents[comp]) projectComponents[comp] = new Set();
            comps[comp].forEach(platform => projectComponents[comp].add(platform));
          }
        }
      } catch(ex) {
        console.warn(`Project error ${ex}`);
      }
    }

    // Process astro-embed YAML files
    const embedPaths = extractAstroEmbedPaths(mdText);
    for (const embedPath of embedPaths) {
      try {
        // Convert /files/... path to public/files/...
        const fullPath = path.join(__dirname, "..", "public", embedPath);
        if (fs.existsSync(fullPath) && fullPath.endsWith(".yaml")) {
          const yamlContent = fs.readFileSync(fullPath, "utf-8");
          const yamlObj = yaml.load(yamlContent, {schema: SCHEMA});
          if (yamlObj && typeof yamlObj === "object" && "esphome" in yamlObj) {
            const comps = parseComponents(yamlObj);
            for (const comp in comps) {
              if (!projectComponents[comp]) projectComponents[comp] = new Set();
              comps[comp].forEach(platform => projectComponents[comp].add(platform));
            }
          }
        }
      } catch(ex) {
        console.warn(`Error processing astro-embed file ${embedPath}: ${ex}`);
      }
    }
    if (Object.keys(projectComponents).length > 0) {
      projectSummary[projectName] = projectComponents;
    }
  }

  return { devices: deviceSummary, projects: projectSummary };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // If run directly, print markdown output
  const { devices, projects } = extractComponentsFromContent();
  console.log("# Device Components Summary\n");
  for (const device in devices) {
    console.log(`${device}`);
    for (const comp in devices[device]) {
      console.log(`  - ${comp}`);
      for (const plat of Array.from(devices[device][comp]).sort()) {
        console.log(`      - ${plat}`);
      }
    }
    console.log();
  }
  console.log("# Project Components Summary\n");
  for (const project in projects) {
    console.log(`${project}`);
    for (const comp in projects[project]) {
      console.log(`  - ${comp}`);
      for (const plat of Array.from(projects[project][comp]).sort()) {
        console.log(`      - ${plat}`);
      }
    }
    console.log();
  }
}