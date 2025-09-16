#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/community-projects.json");

async function fetchGitHubStars(url) {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    const headers = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers });

    if (response.ok) {
      const data = await response.json();
      return data.stargazers_count;
    } else if (response.status === 403) {
      console.warn(`⚠️  Rate limit hit for ${url}`);
      return null;
    } else {
      console.warn(`⚠️  Failed to fetch stars for ${url}: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch GitHub stars for ${url}:`, error.message);
    return null;
  }
}

async function updateStars() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const projects = data.projects;

  console.log("🌟 Updating GitHub stars for community projects...\n");

  let updated = 0;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const project of projects) {
    let repoHostname;
    try {
      repoHostname = new URL(project.repository).hostname;
    } catch (err) {
      repoHostname = "";
    }
    if (repoHostname === "github.com") {
      const stars = await fetchGitHubStars(project.repository);

      if (stars !== null) {
        const oldStars = project.stars || 0;
        project.stars = stars;
        const diff = stars - oldStars;
        const change = diff > 0 ? `(+${diff})` : diff < 0 ? `(${diff})` : "";
        console.log(`  ✓ ${project.name}: ${stars} stars ${change}`);
        if (diff !== 0) updated++;
      } else {
        console.log(`  ⚠️  ${project.name}: Could not fetch stars`);
      }

      // Delay to avoid rate limiting
      await delay(100);
    }
  }

  // Sort projects to maintain consistent order
  data.projects = projects;

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");

  console.log(`\n✨ Updated ${updated} project(s) with new star counts!`);

  if (!process.env.GITHUB_TOKEN) {
    console.log("\n💡 Tip: Set GITHUB_TOKEN environment variable to avoid rate limits");
  }
}

async function main() {
  try {
    await updateStars();
  } catch (error) {
    console.error("❌ Error updating stars:", error);
    process.exit(1);
  }
}

main();
