import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import ReactMarkdown from 'react-markdown'
import remarkAlert from 'remark-github-blockquote-alert'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{`${siteTitle} - ${postData.title}`}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <article className={utilStyles.justifyText}>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkAlert, remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          // rehypeRaw is needed to render HTML tags like <details>
          remarkRehypeOptions={{
            footnoteLabel: "References",
          }}
        >
          {postData.content}
        </ReactMarkdown>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
