import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const helloWorld = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hello World! 🖐</h1>
    <h5>February 21, 2019. ☕️</h5>
    <p>As is the case with almost everything I can imagine, a friendly introduction to my blog.
    The truth is I have actually been postponing publishing of my blog for a while.
    Right now just seems like the right time. So here you go.</p>
    <p>A little more from the hello world page.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default helloWorld
