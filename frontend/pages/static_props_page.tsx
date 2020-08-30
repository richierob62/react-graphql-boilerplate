import * as React from 'react';

import Layout from '../components/Layout';
import { getMarkdownData } from '../lib/parse_md';

export function getStaticProps() {
  const staticPageData = getMarkdownData();
  return {
    props: {
      staticPageData,
    },
  };
}

export default ({ staticPageData }: any) => {
  const formatedContents = (c: string) => {
    const paragraphs = c.split('\n');
    return (
      <div>
        {paragraphs.map((p: string) => (
          <div key={p}>
            {p}
            <br />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout title={'static page'}>
      {staticPageData ? (
        <div>
          {staticPageData.map((page: any) => (
            <div key={page.id}>
              <h1>{page.title}</h1>
              <h2>{page.date}</h2>
              <div>{formatedContents(page.content)}</div>
            </div>
          ))}
        </div>
      ) : null}
    </Layout>
  );
};