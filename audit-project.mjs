#!/usr/bin/env node
import fs from 'node:fs';

const required = ['name', 'roles', 'flows', 'permissions', 'exceptions', 'acceptance'];
const path = process.argv[2];
if (!path) {
  console.error('Usage: miniapp-readiness-audit <project.json>');
  process.exit(2);
}
let project;
try { project = JSON.parse(fs.readFileSync(path, 'utf8')); }
catch (error) { console.error('Cannot read project JSON:', error.message); process.exit(2); }

const issues = [];
for (const field of required) {
  const value = project[field];
  if (field === 'name') {
    if (typeof value !== 'string' || !value.trim()) issues.push('name must be a non-empty string');
  } else if (!Array.isArray(value) || value.filter(Boolean).length === 0) {
    issues.push(field + ' must contain at least one documented item');
  }
}
const result = { project: project.name || null, passed: issues.length === 0, issues };
console.log(JSON.stringify(result, null, 2));
process.exit(result.passed ? 0 : 1);
