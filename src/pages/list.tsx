import * as React from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'

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
    fields: {
      slug: string
    }
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

const PostLink: React.FC<EdgeInterface> = ({ node }) => (
  <div>
    <Link to={`/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
  </div>
)

const ListPage: React.FC<PageQueryInterface> = ({ data }) => {
  const Posts = data.allMarkdownRemark.edges.map(edge => <PostLink node={edge.node} key={edge.node.id} />)
  return (
    <Layout>
      <h1>Post List</h1>
      <div>{Posts}</div>
    </Layout>
  )
}

export default ListPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
