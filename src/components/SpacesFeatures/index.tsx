import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
export default function SpacesFeatures(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <section>
            <div className="container">
                <h1 className="header">All BnearIT Spaces</h1>
                <section className="row">
                    
                {siteConfig.customFields.spaces.map((props, idx) => (
                    <article className="col col--6 margin-bottom--lg" key={idx}>
                            
                        <Link className={clsx("card padding--lg", styles.spacesCard)} to={"/spaces/" + props.config.slug}>
                                <section>
                                    <h2 className="text--truncate"><img src={props.config.icon} hidden={!props.config.icon}></img>{props.config.title}</h2>
                                    <p className="text--truncate">{props.config.description}</p>
                                </section>
                            
                        </Link>
                    </article>
                    
                    ))}
                </section>
            </div>
        </section>
    )
}