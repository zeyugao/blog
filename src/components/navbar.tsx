import * as React from 'react'
import styled from '@emotion/styled'
import AnimatedLink from './animated-link'

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;

  margin-top: 20px;

  margin-left: auto;
  margin-right: auto;

  margin-bottom: 15px;
`

const FlexDiv = styled.div`
  display: flex;
`

interface NavBarInterface {
  showBlog?: boolean
  showAbout?: boolean
}

const NavBar: React.FC<NavBarInterface> = ({ showBlog = true, showAbout = false }) => {
  const BlogLink = (
    <AnimatedLink to="/list/">
      <span style={{ fontSize: '1.2rem' }}>Blog</span>
    </AnimatedLink>
  )

  const AboutLink = (
    <div>
      <AnimatedLink to="/list/"> About </AnimatedLink>
    </div>
  )

  return (
    <StyledNav>
      <FlexDiv>
        <AnimatedLink to="/" style={{ marginRight: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>Home</span>
        </AnimatedLink>
        {showBlog ? BlogLink : <></>}
      </FlexDiv>
      {showAbout ? AboutLink : <></>}
    </StyledNav>
  )
}

export default NavBar
