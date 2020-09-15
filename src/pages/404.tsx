import * as React from 'react'
import { Link } from 'gatsby'

import CenterLayout from '../layouts/center'

const NotFoundPage = () => (
  <CenterLayout>
    <h1>404: Page not found.</h1>
    <p>
      You've hit the void. <Link to="/">Go back.</Link>
    </p>
  </CenterLayout>
)

export default NotFoundPage
