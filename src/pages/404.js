import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 - Not found" />
    <h1 style={{ 
      fontSize: 72,
      justifyContent: `center`,
      alignContent: `center`,
      flex: 1,
      marginLeft: `auto`,
      marginRight: `auto`}}>4<span role="img" aria-label="Crying">😭</span>4</h1>
      <p>You've ventured into the desert. Hope you find your back!</p>
      <Link to="/">Here's a hand</Link>
  </Layout>
)

export default NotFoundPage
