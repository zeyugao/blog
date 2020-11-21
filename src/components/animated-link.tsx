import styled from '@emotion/styled'
import { Link } from 'gatsby'

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

export default AnimatedLink
