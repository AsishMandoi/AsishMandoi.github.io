import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Blogs({ allPostsData }) {
  return (
    <Layout blogs>
      <Head>
        <title>{`${siteTitle} - Blogs`}</title>
      </Head>
      <h2 className={utilStyles.headingXl}>Blogs</h2>
      <section>
        <p><i>Nothing here yet... Please come back later.</i></p>
      </section>
      
      {/* Comment the above section and uncomment the following section and add blog posts */}

      {/* <section>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <p className={utilStyles.lightText}>
                <Date dateString={date} />
              </p>
            </li>          
          ))}
        </ul>
      </section> */}
    </Layout>
  )
}
