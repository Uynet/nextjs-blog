import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from "next/head"
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.scss'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <h2 className={utilStyles.headingXl}>{postData.title}</h2>
      <div className={utilStyles.lightText}>
      <Date dateString={postData.date}/>
      </div>
      <hr/>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHTML}} />
      </article>
    </Layout>
  )
}