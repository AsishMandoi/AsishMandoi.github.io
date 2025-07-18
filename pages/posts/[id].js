import Head from 'next/head'
import Image from 'next/image'
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
    <Layout isPost>
      <Head>
        <title>{`${siteTitle} - ${postData.title}`}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <article className={utilStyles.justifyText}>
        <div className={`${utilStyles.lightText} ${utilStyles.mdMeta}`}>
          <Date dateString={postData.date} />
          <span>&#9900;</span>
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className={`${utilStyles.license} ${utilStyles.imageBg}`} target="_blank">
            <Image
              priority
              src="/images/CC_BY-NC-SA.svg"
              className={utilStyles.roundedSquare}
              alt="Creative Commons Licence"
              width={88}
              height={31}
            />
          </a>
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
