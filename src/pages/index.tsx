import * as React from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
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

const AnimatedLink = styled(Link)`
  color: black;
  margin-right: 10px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  font-size: 1.25rem;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover {
    text-decoration: none;
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
    text-decoration: none;
  }
`

interface ImageQueryProps {
  head: {
    childImageSharp: GatsbyImageFixedProps
  }
  github: {
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
          <div style={{ fontSize: 20, marginTop: 5 }}>
            Undergraduate of Information Security in{' '}
            <a href="https://www.ustc.edu.cn" style={{ textDecoration: 'none' }}>
              USTC
            </a>
          </div>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <AnimatedLink to="https://github.com/zeyugao">GitHub</AnimatedLink>
            <AnimatedLink to="/list/">Blog</AnimatedLink>
          </div>
        </div>
      </Content>
    </CenterLayout>
  )
}

export default IndexPage

export const query = graphql`
  query ImageQuery {
    head: file(relativePath: { eq: "head.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
