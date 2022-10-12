import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }) {
  const [csrPostsData, setCsrPostsData] = useState([]);

  useEffect(() => {
    fetch('/api/post')
      .then(res => res.json())
      .then(data => setCsrPostsData(data?.allPostsData))
      .catch(err => console.log('🚀 ~ err', err));
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog List</h2>
        <h4>Blog Data from SSG</h4>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>

        <h4>Blog Data from CSR</h4>
        <ul>
          {csrPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

//export async function getServerSideProps() {
//  const allPostsData = getSortedPostsData();
//  return {
//    props: {
//      allPostsData,
//    },
//  };
//}
