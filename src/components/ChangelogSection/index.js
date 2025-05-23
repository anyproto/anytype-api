import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.css";

function getTimeAgo(dateString, isLatest) {
  if (isLatest) return "Latest";

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

const recentChanges = [
  {
    version: "2025-05-20",
    date: "2025-05-20",
    title: "Authentication, Type and Property Updates",
    description: "New authentication endpoints, stable type and property keys, rate limiting enhancements",
  },
  {
    version: "2025-04-22",
    date: "2025-04-22",
    title: "Comprehensive CRUD Operations",
    description: "Space, type, property, and tag management endpoints",
  },
  {
    version: "2025-03-17",
    date: "2025-03-17",
    title: "Initial API Release",
    description: "Initial API release with basic CRUD operations",
  },
];

function ChangelogEntry({ version, date, title, description, isLatest }) {
  const timeAgo = getTimeAgo(date, isLatest);

  return (
    <Link to={`/docs/api/changelog#${version}`} className={styles.changelogEntryLink}>
      <div className={styles.changelogEntry}>
        <div className={styles.entryHeader}>
          <div className={styles.versionInfo}>
            <h3 className={styles.entryTitle}>{title}</h3>
            <div className={styles.versionMeta}>
              <span className={styles.version}>{version}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.timeAgo}>{timeAgo}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}

export default function ChangelogSection() {
  return (
    <section className={styles.changelogSection}>
      <div className="container">
        <div className={styles.changelogContainer}>
          <div className={styles.changelogContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.title}>What's New</h2>
              <p className={styles.subtitle}>Stay up to date with the latest API changes and improvements.</p>
            </div>

            <div className={styles.changelogList}>
              {recentChanges.map((change, idx) => (
                <ChangelogEntry key={idx} {...change} isLatest={idx === 0} />
              ))}
            </div>

            <div className={styles.viewAllContainer}>
              <Link to="/docs/api/changelog" className={styles.viewAllLink}>
                All changes →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
