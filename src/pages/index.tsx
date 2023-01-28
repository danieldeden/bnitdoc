import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SpacesFeatures from '@site/src/components/SpacesFeatures';


import styles from './index.module.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main className="container container--fluid margin-vert--lg">
        <SpacesFeatures />
        <Link
            className="button button--secondary button--lg"
            to="/spaces">
            Show all Spaces
          </Link>
      </main>
    </Layout>
  );
}
