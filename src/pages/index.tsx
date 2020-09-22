import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Img, { GatsbyImageFixedProps } from 'gatsby-image'

import '../styles/main.css'
import CenterLayout from '../layouts/center'

const Content = styled.div`
  @media (min-width: 720px) {
    display: flex;
    flex-direction: row;
  }

  line-height: 1.5;
`

const RoundedImg = styled(Img)`
  grid: 1/-1;
  border-radius: 50%;
`

interface ImageQueryProps {
  head: {
    childImageSharp: GatsbyImageFixedProps
  }
  github: {
    childImageSharp: GatsbyImageFixedProps
  }
  gmail: {
    childImageSharp: GatsbyImageFixedProps
  }
}

const IndexPage = ({ data }: { data: ImageQueryProps }) => {
  return (
    <CenterLayout>
      <Content>
        <RoundedImg
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 25,
            width: 150,
            height: 150,
            aspectRatio: 1
          }}
          fixed={data.head.childImageSharp.fixed}
          alt="头像"
          imgStyle={{ objectFit: 'contain' }}
        />
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <div style={{ marginTop: 10, fontSize: '2rem', fontWeight: 600 }}>Elsa Granger</div>
          <div style={{ fontSize: 20 }}>
            Undergraduate of Information Security in{' '}
            <a href="https://www.ustc.edu.cn" style={{ textDecoration: 'none' }}>
              USTC
            </a>
          </div>
          <div style={{ display: 'flex' }}>
            <a style={{ padding: 5 }} href="https://github.com/zeyugao">
              <Img fixed={data.github.childImageSharp.fixed} />
            </a>
          </div>
        </div>
      </Content>
    </CenterLayout>
  )
}

export default IndexPage

export const query = graphql`
  query ImageQuery {
    github: file(relativePath: { eq: "github-logo.png" }) {
      childImageSharp {
        fixed(height: 24, width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    gmail: file(relativePath: { eq: "google-logo.png" }) {
      childImageSharp {
        fixed(height: 24, width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    head: file(relativePath: { eq: "head.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
