import * as React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import NavBar from '../components/navbar'
import Footer from '../components/footer'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const Layout = styled.div`
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => (
  <div>
    <NavBar />
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <Footer />
    </Layout>
  </div>
)

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
