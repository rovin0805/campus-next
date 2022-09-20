import { useEffect, useState } from 'react';
import { getSortedPostsData } from '../lib/getSortedPostsData';

export default function FirstPost({ allPostsData }) {
  const [csrPostsData, setCsrPostsData] = useState([]);

  useEffect(() => {
    fetch('/api/post')
      .then(res => res.json())
      .then(data => setCsrPostsData(data?.allPostsData))
      .catch(err => console.log('🚀 ~ err', err));
  }, []);

  return (
    <section>
      <h2>Blog Data from SSG</h2>
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

      <h2>Blog Data from CSR</h2>
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
