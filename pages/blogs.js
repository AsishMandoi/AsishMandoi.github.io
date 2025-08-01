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
    <Layout page="blogs">
      <Head>
        <title>{`${siteTitle} - Blogs`}</title>
      </Head>
      <h2 className={utilStyles.headingXl}>Blogs</h2>
      {/* <section>
        <p><i>I'm planning to publish some blog posts about my interests and my experiences soon, some of which might get technical. Keep an eye out!</i></p>
      </section> */}
      
      {/* Comment the above section and uncomment the following section and add blog posts */}

      <section>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            id === 'about' ? null :
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <p className={utilStyles.lightText} id='li'>
                <Date dateString={date} />
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
