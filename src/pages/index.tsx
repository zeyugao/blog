import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import NavBar from '../components/navbar'
import PostPreview from '../components/post-preview'
import Footer from '../components/footer'

import '../styles/main.css'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Baloo Tammudu 2', sans-serif;
`

interface EdgeInterface {
  node: {
    id: number
    excerpt: string
    frontmatter: {
      date: string
      title: string
      slug: string
    }
  }
}

interface PageQueryInterface {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: EdgeInterface[]
    }
  }
}

const ListPage: React.FC<PageQueryInterface> = ({ data }) => {
  const { length } = data.allMarkdownRemark.edges
  const Posts = data.allMarkdownRemark.edges.map((edge, index) => (
      <>
        <PostPreview node={edge.node} key={edge.node.id} />
        {index < length - 1 ? <hr style={{ marginRight: '16px', marginLeft: '16px', height: '1px' }} /> : <></>}
      </>
    )
  )
  return (
    <div>
      <NavBar showBlog={false} showFriends />
      <Layout>
        <h1 style={{ justifyContent: 'left' }}>Post List</h1>
        <div>{Posts}</div>
        <Footer />
      </Layout>
    </div>
  )
}

export default ListPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
