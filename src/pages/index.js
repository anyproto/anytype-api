import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ChangelogSection from "@site/src/components/ChangelogSection";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import BuildIcon from "@site/static/img/build.svg";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.gridContainer}>
            <div className={styles.textContent}>
              <h1 className="hero__title">{siteConfig.themeConfig.metadata[0].content}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link className="button button--secondary" to="/docs/guides/get-started/authentication">
                  Get started
                </Link>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <BuildIcon className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <ChangelogSection />
      </main>
    </Layout>
  );
}
