import Link from 'next/link'
import Layout from '../components/Layout'
import ChatBox from '../components/ChatBot'
import IdList from '../components/IdList'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <p>
      <ChatBox />
      <IdList />
    </p>
  </Layout>
)

export default IndexPage
