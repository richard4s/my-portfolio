import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hello World! 🖐</h1>
    <h5>February 21, 2019. ☕️</h5>
    <p>As is the case with almost everything I can imagine, a friendly introduction to my blog.
    The truth is I have actually been postponing publishing of my blog for a while.
    Right now just seems like the right time. So here you go.</p>
    
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Read More...</Link>
  </Layout>
)

export default IndexPage
