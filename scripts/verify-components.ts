#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import {
  extractComponentsFromContent,
  __dirname as scriptsDir,
  DEVICES_DIR,
  PROJECTS_DIR,
} from "./extract-components.ts";

const COMPONENTS_DIR = path.join(scriptsDir, "../src/content/components");

interface Frontmatter {
  components?: string[];
  relatedDevices?: string[];
  [key: string]: any;
}

function extractFrontmatter(mdContent: string, file: string): Frontmatter | null {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\n---/;
  const match = mdContent.match(frontmatterRegex);
  if (!match) {
    console.warn(`Frontmatter missing: ${file}`);
    return null;
  }
  
  try {
    const frontmatter = yaml.load(match[1]) as Frontmatter;
    return frontmatter;
  } catch (e) {
    console.warn(`Error parsing frontmatter: ${e}`);
    return null;
  }
}

function normalizeComponentName(component: string, platform?: string): string {
  if (platform) return `${component.replace(/_/g, "-")}-${platform.replace(/_/g, "-")}`;
  return component.replace(/_/g, "-");
}

function flattenComponents(components: Record<string, Set<string>>): Set<string> {
  const result = new Set<string>();
  for (const [comp, platforms] of Object.entries(components)) {
    if (platforms.size === 0) {
      result.add(normalizeComponentName(comp));
    } else {
      for (const plat of platforms) {
        result.add(normalizeComponentName(comp, plat));
      }
    }
  }
  return result;
}

function readComponentFiles(): Map<string, string[]> {
  const componentsMap = new Map<string, string[]>();
  const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith(".md"));
  
  for (const file of files) {
    const filePath = path.join(COMPONENTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content, file);
    const componentName = file.replace(/\.md$/, "");
    
    componentsMap.set(componentName, frontmatter?.relatedDevices || []);
  }
  
  return componentsMap;
}

function main() {
  // Extract components from YAML content
  const { devices, projects } = extractComponentsFromContent();
  
  console.log("# Component Cross-Reference Verification Report\n");
  console.log("Generated:", new Date().toISOString(), "\n");
  
  // ========================================
  // DEVICES VERIFICATION
  // ========================================
  console.log("## DEVICES\n");
  
  const deviceFiles = fs.readdirSync(DEVICES_DIR).filter(f => f.endsWith(".md"));
  
  for (const fname of deviceFiles.sort()) {
    const deviceName = fname.replace(/\.md$/, "");
    const filePath = path.join(DEVICES_DIR, fname);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content, fname);
    
    const yamlComponents = devices[deviceName] ? flattenComponents(devices[deviceName]) : new Set<string>();
    const frontmatterComponents = new Set(frontmatter?.components || []);
    
    // Find discrepancies
    const inYamlNotInFrontmatter = Array.from(yamlComponents).filter(c => !frontmatterComponents.has(c));
    const inFrontmatterNotInYaml = Array.from(frontmatterComponents).filter(c => !yamlComponents.has(c));
    
    if (inYamlNotInFrontmatter.length > 0 || inFrontmatterNotInYaml.length > 0) {
      const status = frontmatter?.status || 'unknown';
      console.log(`### ${deviceName} (${status})`);
      
      if (inYamlNotInFrontmatter.length > 0) {
        console.log("❌ Used in YAML but NOT in frontmatter:");
        inYamlNotInFrontmatter.forEach(c => console.log(`   - ${c}`));
      }
      
      if (inFrontmatterNotInYaml.length > 0) {
        console.log("⚠️  In frontmatter but NOT used in YAML:");
        inFrontmatterNotInYaml.forEach(c => console.log(`   - ${c}`));
      }
      
      console.log();
    }
  }
  
  // ========================================
  // PROJECTS VERIFICATION
  // ========================================
  console.log("## PROJECTS\n");
  
  const projectFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".md"));
  
  for (const fname of projectFiles.sort()) {
    const projectName = fname.replace(/\.md$/, "");
    const filePath = path.join(PROJECTS_DIR, fname);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content, fname);
    
    const yamlComponents = projects[projectName] ? flattenComponents(projects[projectName]) : new Set<string>();
    const frontmatterComponents = new Set(frontmatter?.components || []);
    
    // Find discrepancies
    const inYamlNotInFrontmatter = Array.from(yamlComponents).filter(c => !frontmatterComponents.has(c));
    const inFrontmatterNotInYaml = Array.from(frontmatterComponents).filter(c => !yamlComponents.has(c));
    
    if (inYamlNotInFrontmatter.length > 0 || inFrontmatterNotInYaml.length > 0) {
      const status = frontmatter?.status || 'unknown';
      console.log(`### ${projectName} (${status})`);
      
      if (inYamlNotInFrontmatter.length > 0) {
        console.log("❌ Used in YAML but NOT in frontmatter:");
        inYamlNotInFrontmatter.forEach(c => console.log(`   - ${c}`));
      }
      
      if (inFrontmatterNotInYaml.length > 0) {
        console.log("⚠️  In frontmatter but NOT used in YAML:");
        inFrontmatterNotInYaml.forEach(c => console.log(`   - ${c}`));
      }
      
      console.log();
    }
  }
  
  // ========================================
  // COMPONENTS VERIFICATION (relatedDevices)
  // ========================================
  console.log("## COMPONENTS (relatedDevices verification)\n");
  
  // Build actual usage map: component -> Set<device>
  const actualDeviceUsage = new Map<string, Set<string>>();
  
  for (const [deviceName, components] of Object.entries(devices)) {
    const componentNames = flattenComponents(components);
    for (const comp of componentNames) {
      if (!actualDeviceUsage.has(comp)) {
        actualDeviceUsage.set(comp, new Set());
      }
      actualDeviceUsage.get(comp)!.add(deviceName);
    }
  }
  
  // Read component files and compare
  const componentFiles = readComponentFiles();
  
  for (const [componentName, relatedDevices] of Array.from(componentFiles.entries()).sort()) {
    const actualDevices = actualDeviceUsage.get(componentName) || new Set<string>();
    const declaredDevices = new Set(relatedDevices);
    
    const actualNotDeclared = Array.from(actualDevices).filter(d => !declaredDevices.has(d));
    const declaredNotActual = Array.from(declaredDevices).filter(d => !actualDevices.has(d));
    
    if (actualNotDeclared.length > 0 || declaredNotActual.length > 0) {
      console.log(`### ${componentName}`);
      
      if (actualNotDeclared.length > 0) {
        console.log("❌ Used by device but NOT in relatedDevices:");
        actualNotDeclared.forEach(d => console.log(`   - ${d}`));
      }
      
      if (declaredNotActual.length > 0) {
        console.log("⚠️  In relatedDevices but NOT actually used:");
        declaredNotActual.forEach(d => console.log(`   - ${d}`));
      }
      
      console.log();
    }
  }
  
  // ========================================
  // SUMMARY
  // ========================================
  console.log("## SUMMARY\n");
  
  let devicesWithIssues = 0;
  let projectsWithIssues = 0;
  let componentsWithIssues = 0;
  
  for (const fname of deviceFiles) {
    const deviceName = fname.replace(/\.md$/, "");
    const filePath = path.join(DEVICES_DIR, fname);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content, fname);
    
    const yamlComponents = devices[deviceName] ? flattenComponents(devices[deviceName]) : new Set<string>();
    const frontmatterComponents = new Set(frontmatter?.components || []);
    
    const inYamlNotInFrontmatter = Array.from(yamlComponents).filter(c => !frontmatterComponents.has(c));
    const inFrontmatterNotInYaml = Array.from(frontmatterComponents).filter(c => !yamlComponents.has(c));
    
    if (inYamlNotInFrontmatter.length > 0 || inFrontmatterNotInYaml.length > 0) {
      devicesWithIssues++;
    }
  }
  
  for (const fname of projectFiles) {
    const projectName = fname.replace(/\.md$/, "");
    const filePath = path.join(PROJECTS_DIR, fname);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content, fname);
    
    const yamlComponents = projects[projectName] ? flattenComponents(projects[projectName]) : new Set<string>();
    const frontmatterComponents = new Set(frontmatter?.components || []);
    
    const inYamlNotInFrontmatter = Array.from(yamlComponents).filter(c => !frontmatterComponents.has(c));
    const inFrontmatterNotInYaml = Array.from(frontmatterComponents).filter(c => !yamlComponents.has(c));
    
    if (inYamlNotInFrontmatter.length > 0 || inFrontmatterNotInYaml.length > 0) {
      projectsWithIssues++;
    }
  }
  
  for (const [componentName, relatedDevices] of componentFiles.entries()) {
    const actualDevices = actualDeviceUsage.get(componentName) || new Set<string>();
    const declaredDevices = new Set(relatedDevices);
    
    const actualNotDeclared = Array.from(actualDevices).filter(d => !declaredDevices.has(d));
    const declaredNotActual = Array.from(declaredDevices).filter(d => !actualDevices.has(d));
    
    if (actualNotDeclared.length > 0 || declaredNotActual.length > 0) {
      componentsWithIssues++;
    }
  }
  
  console.log(`- Devices with issues: ${devicesWithIssues}/${deviceFiles.length}`);
  console.log(`- Projects with issues: ${projectsWithIssues}/${projectFiles.length}`);
  console.log(`- Components with issues: ${componentsWithIssues}/${componentFiles.size}`);
  console.log();
  
  if (devicesWithIssues === 0 && projectsWithIssues === 0 && componentsWithIssues === 0) {
    console.log("✅ All cross-references are correct!");
  } else {
    console.log("⚠️  Some cross-references need to be updated.");
  }
}

main();
