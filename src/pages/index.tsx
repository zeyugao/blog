import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Img, { GatsbyImageFixedProps } from 'gatsby-image'

const IndexStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
      <div style={{ paddingBottom: 20, fontSize: '2rem', fontWeight: 600 }}>Elsa Granger</div>
      <div style={{ paddingBottom: 20, fontSize: 20 }}>
        Undergraduate of Information Security in{' '}
        <a href="https://www.ustc.edu.cn" style={{ textDecoration: 'none' }}>
          USTC
        </a>
      </div>
      <div style={{ display: 'flex' }}>
        <a style={{ padding: 5 }} href="https://github.com/zeyugao">
          <Img fixed={data.github.childImageSharp.fixed} />
        </a>
        <a style={{ padding: 5 }} href="mailto:charles.gaozeyu@gmail.com">
          <Img fixed={data.gmail.childImageSharp.fixed} />
        </a>
      </div>
    </div>
  )
}

const IndexPage = ({ data }: { data: ImageQueryProps }) => {
  console.log(data)
  return (
    <IndexStyle>
      <RoundedImg
        style={{ margin: 25, width: 150, height: 150, aspectRatio: 1 }}
        fixed={data.head.childImageSharp.fixed}
        alt="头像"
        imgStyle={{ objectFit: 'contain' }}
      />
      <SelfDescription data={data} />
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
