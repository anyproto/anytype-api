#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/community-projects.json');
const COMMUNITY_DIR = path.join(__dirname, '../docs/examples/community');
const OVERVIEW_FILE = path.join(__dirname, '../docs/examples/overview.mdx');

function generateProjectPage(project, position) {
  const statusBadge = {
    active: '🟢 Active',
    maintained: '🟡 Maintained',
    archived: '🔴 Archived',
    experimental: '🔵 Experimental'
  }[project.status] || project.status;

  const contributors = project.contributors
    ? `\n**Contributors:** ${project.contributors.join(', ')}`
    : '';

  const website = project.website
    ? `\n**Website:** [${new URL(project.website).hostname}](${project.website})`
    : '';

  const dateAdded = project.dateAdded
    ? `\n- **Added:** ${new Date(project.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
    : '';

  const pluralCategories = {
    'SDK': 'sdks',
    'Integration': 'integrations',
    'Tool': 'tools',
    'Extension': 'extensions',
    'Template': 'templates',
    'Other': 'other'
  };
  
  const categoryAnchor = pluralCategories[project.category] || project.category.toLowerCase() + 's';

  return `---
title: ${project.name}
sidebar_label: ${project.name}
sidebar_position: ${position}
---

# ${project.name}

${project.description}

## Details

- **Author:** [${project.author}](https://github.com/${project.author})${contributors}
- **Category:** [${project.category}](/docs/examples/overview#${categoryAnchor})
- **Language:** ${project.language}
- **Status:** ${statusBadge}${dateAdded}

## Links

**Repository:** [${project.repository.replace('https://github.com/', '')}](${project.repository})${website}

## Tags

${project.tags.map(tag => `\`${tag}\``).join(' ')}
`;
}

function generateOverviewSection(projects) {
  const categoryGroups = {};

  projects.forEach(project => {
    const category = project.category;
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(project);
  });

  let content = '';
  
  const pluralCategories = {
    'SDK': 'SDKs',
    'Integration': 'Integrations',
    'Tool': 'Tools',
    'Extension': 'Extensions',
    'Template': 'Templates',
    'Other': 'Other'
  };

  Object.keys(categoryGroups).sort().forEach(category => {
    const pluralCategory = pluralCategories[category] || category + 's';
    content += `\n### ${pluralCategory}\n\n`;
    categoryGroups[category].forEach(project => {
      const safeId = project.id.replace('/', '-');
      content += `- **[${project.name}](/docs/examples/community/${safeId})** - ${project.description}\n`;
    });
  });

  return content;
}

function updateOverviewFile(projects) {
  let overviewContent = fs.readFileSync(OVERVIEW_FILE, 'utf8');

  const communityStart = overviewContent.indexOf('## Community');
  if (communityStart === -1) {
    console.error('Could not find Community section in overview.mdx');
    return;
  }

  const afterCommunity = overviewContent.substring(communityStart);
  const nextSectionMatch = afterCommunity.match(/\n## /);
  const communityEnd = nextSectionMatch
    ? communityStart + nextSectionMatch.index
    : overviewContent.length;

  const beforeCommunity = overviewContent.substring(0, communityStart);
  const afterCommunityContent = overviewContent.substring(communityEnd);

  const newCommunitySection = `## Community

Projects by the community showcasing creative implementations and use cases.

**→ [Submit your project](https://github.com/anyproto/anytype-api/blob/main/data/README.md)** - Share what you've built with the Anytype API!
${generateOverviewSection(projects)}`;

  const newContent = beforeCommunity + newCommunitySection + afterCommunityContent;

  fs.writeFileSync(OVERVIEW_FILE, newContent);
  console.log('✅ Updated overview.mdx');
}

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const projects = data.projects;

  console.log(`📚 Generating pages for ${projects.length} community projects...`);

  if (!fs.existsSync(COMMUNITY_DIR)) {
    fs.mkdirSync(COMMUNITY_DIR, { recursive: true });
  }

  const existingFiles = fs.readdirSync(COMMUNITY_DIR);
  existingFiles.forEach(file => {
    if (file.endsWith('.mdx')) {
      fs.unlinkSync(path.join(COMMUNITY_DIR, file));
    }
  });

  // Sort projects by name alphabetically and assign positions
  const sortedProjects = [...projects].sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  sortedProjects.forEach((project, index) => {
    const position = index + 1; // Start from position 1
    const content = generateProjectPage(project, position);
    const safeId = project.id.replace('/', '-');
    const filePath = path.join(COMMUNITY_DIR, `${safeId}.mdx`);
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Generated ${safeId}.mdx`);
  });

  updateOverviewFile(projects);

  console.log(`\n✨ Successfully generated ${projects.length} community project pages!`);
  console.log('\n📝 To add a new project:');
  console.log('   1. Edit data/community-projects.json');
  console.log('   2. Run: npm run gen-community-projects');
}

try {
  main();
} catch (error) {
  console.error('❌ Error generating community projects:', error);
  process.exit(1);
}
