import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

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

const RoundedCard = styled.div`
  border-radius: 16px;
  max-width: 750px;
  width: 90vw;
  background-color: whitesmoke;

  padding: 20px;
  margin: 20px;
`

const PostPreview: React.FC<EdgeInterface> = ({ node }) => {
  return (
    <Link to={`/${node.frontmatter.slug}`} style={{ textDecoration: 'none', color: 'black' }}>
      <RoundedCard>
        <h3 style={{ margin: 0 }}>{node.frontmatter.title}</h3>
        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10, fontSize: '0.75rem' }}>{node.excerpt}</div>
        <div>{node.frontmatter.date}</div>
      </RoundedCard>
    </Link>
  )
}

export default PostPreview
