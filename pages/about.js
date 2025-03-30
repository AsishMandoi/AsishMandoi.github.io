import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getPostData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function About({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{`${siteTitle} - ${postData.title}`}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <article className={utilStyles.justifyText}>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticProps() {
  const postData = await getPostData('about')
  return {
    props: {
      postData
    }
  }
}
