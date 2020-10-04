import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;

  margin-top: 20px;

  margin-left: auto;
  margin-right: auto;

  margin-bottom: 35px;
`

const NavBar: React.FC = () => {
  return (
    <StyledNav>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <h1 style={{ borderBottom: 'none', fontSize: '2rem', margin: 0 }}>Home</h1>
      </Link>
      <div>
        <Link to="/list/" style={{ color: 'black', textDecoration: 'none' }}>
          All Posts
        </Link>
      </div>
    </StyledNav>
  )
}

export default NavBar
