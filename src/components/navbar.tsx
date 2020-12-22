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
  margin-bottom: 30px;

  padding-right: 20px;
  padding-left: 20px;
`

const FlexDiv = styled.div`
  display: flex;
`

interface NavBarInterface {
  showBlog?: boolean
  showAbout?: boolean
  showFriends?: boolean
}

const NavBar: React.FC<NavBarInterface> = ({ showBlog = true, showAbout = false, showFriends = false }) => {
  const BlogLink = (
    <AnimatedLink to="/">
      <span style={{ fontSize: '1.5rem' }}>Blog</span>
    </AnimatedLink>
  )

  const FriendPage = (
    <div>
      <AnimatedLink to="/friends/">
        <span style={{ fontSize: '1.5rem' }}>Friends</span>
      </AnimatedLink>
    </div>
  )

  const AboutLink = (
    <div>
      <AnimatedLink to="/about/">
        <span style={{ fontSize: '1.5rem' }}>About</span>
      </AnimatedLink>
    </div>
  )

  return (
    <StyledNav>
      <FlexDiv>
        <AnimatedLink to="https://elsagranger.com" style={{ marginRight: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>Home</span>
        </AnimatedLink>
        {showBlog ? BlogLink : <></>}
      </FlexDiv>
      {showFriends ? FriendPage : <></>}
      {showAbout ? AboutLink : <></>}
    </StyledNav>
  )
}

export default NavBar
