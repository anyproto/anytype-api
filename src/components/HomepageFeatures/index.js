import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Reference",
    Svg: require("@site/static/img/reference.svg").default,
    description: <>Everything you need to know about the API in one place.</>,
    link: "/docs/reference",
    linkText: "Jump to the reference →",
  },
  {
    title: "Examples",
    Svg: require("@site/static/img/examples.svg").default,
    description: <>Real-world examples to kickstart your integration journey.</>,
    link: "/docs/examples",
    linkText: "Explore the examples →",
  },
  {
    title: "Join our Community",
    Svg: require("@site/static/img/community.svg").default,
    description: <>Connect with developers and help shape the future of Anytype.</>,
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
