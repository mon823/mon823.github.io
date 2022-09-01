import * as React from 'react'
import type { HeadFC } from 'gatsby'

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1>Main Pages</h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
