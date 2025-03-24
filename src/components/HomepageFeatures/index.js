import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "📚  API Reference",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, types, and templates to build
        powerful extensions.
      </>
    ),
    link: "/docs/api/anytype-api",
    linkText: "Jump to the reference →",
  },
  {
    title: "💡 Examples",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Browse real-world examples that showcase the potential of the Anytype API. Get inspired to create custom integrations and workflows.
      </>
    ),
    link: "/docs/examples",
    linkText: "Explore the examples →",
  },
  {
    title: "👥 Join our Community",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Connect with other developers, get support, and share your creative projects. Join our community to collaborate and shape the future
        of Anytype.
      </>
    ),
    link: "https://github.com/anyproto",
    linkText: "Check out our GitHub →",
  },
];

function Feature({ Svg, title, description, link, linkText }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
        <Link to={link} className={styles.featureLink}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
