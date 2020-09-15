import * as React from 'react'
import { Link } from 'gatsby'

import CenterLayout from '../layouts/center'

const NotFoundPage = () => (
  <CenterLayout>
    <h1 style={{ marginBottom: 10, lineHeight: 1.5 }}>
      404: Page not found.
    </h1>
    <p style={{ marginTop: 10, lineHeight: 1.5 }}>
      You've hit the void. <Link to="/">Go back.</Link>
    </p>
  </CenterLayout>
)

export default NotFoundPage
