import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
export default function SpacesFeatures(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.spaces}>
      <h1 className="header">Spaces /</h1>
      <section className={clsx("row", styles.cardRow)}>
        {siteConfig.customFields.spaces.map((props, idx) => (
          <Link
            className={clsx("col col--6", styles.spacesCard)}
            key={idx}
            to={"/spaces/" + props.config.slug}
          >
            <div className={clsx("card padding--lg", styles.spacesCard)}>
              <h2 className="text--truncate">
                <img src={props.config.icon} hidden={!props.config.icon}></img>
                {props.config.title}
              </h2>
              <p className="text--truncate">{props.config.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
