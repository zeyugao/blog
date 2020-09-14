import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Img, { GatsbyImageFixedProps } from 'gatsby-image'

import '../styles/main.css'

const IndexStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-family: "Baloo Tammudu 2", sans-serif;
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

const SelfDescription = (props: { data: ImageQueryProps }) => {
  const { data } = props
  return (
    <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <div style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem', fontWeight: 600 }}>Elsa Granger</div>
      <div style={{ marginBottom: 10, fontSize: 20 }}>
        Undergraduate of Information Security in{' '}
        <a href="https://www.ustc.edu.cn" style={{ textDecoration: 'none' }}>
          USTC
        </a>
      </div>
      <div style={{ display: 'flex' }}>
        <a style={{ padding: 5 }} href="https://github.com/zeyugao">
          <Img fixed={data.github.childImageSharp.fixed}/>
        </a>
      </div>
    </div>
  )
}

const IndexPage = ({ data }: { data: ImageQueryProps }) => {
  return (
    <IndexStyle>
      <RoundedImg
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 25,
          marginRight: 25,
          width: 150,
          height: 150,
          aspectRatio: 1
        }}
        fixed={data.head.childImageSharp.fixed}
        alt="头像"
        imgStyle={{ objectFit: 'contain' }}
      />
      <SelfDescription data={data}/>
    </IndexStyle>
  )
}

export default IndexPage

export const query = graphql`
  query ImageQuery {
    github: file(relativePath: { eq: "img/github-logo.png" }) {
      childImageSharp {
        fixed(height: 24, width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    gmail: file(relativePath: { eq: "img/google-logo.png" }) {
      childImageSharp {
        fixed(height: 24, width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    head: file(relativePath: { eq: "img/head.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
