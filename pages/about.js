import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getPostData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import ReactMarkdown from 'react-markdown'
import remarkAlert from 'remark-github-blockquote-alert'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'

export default function About({ postData }) {
  return (
    <Layout page="about">
      <Head>
        <title>{`${siteTitle} - ${postData.title}`}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <article className={utilStyles.justifyText}>
        <ReactMarkdown
          remarkPlugins={[remarkAlert, remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {postData.content}
        </ReactMarkdown>
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
