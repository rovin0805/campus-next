import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';

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

      <Link href={`/posts/write`}>
        <a>Write a post</a>
      </Link>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h4>Blog Data from SSG</h4>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        <h4>Blog Data from CSR</h4>
        <ul>
          {csrPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

//export async function getStaticProps() {
//  const allPostsData = getSortedPostsData();
//  return {
//    props: {
//      allPostsData,
//    },
//  };
//}

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
