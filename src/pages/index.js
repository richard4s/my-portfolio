import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import HelloWorldImg from "../components/images/helloWorldImg"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Blog Home" keywords={[`Richard Oluwo`, `Blog`, `Software Developer`]} />
    <h1>Hello World! <span role="img" aria-label="Wave">🖐</span></h1>
    <h5>February 21, 2019. <span role="img" aria-label="Coffee">☕️</span></h5>
    <p>As is the case with almost everything I can imagine, a friendly introduction to my blog.
    The truth is I have actually been postponing publishing of my blog for a while.
    Right now just seems like the right time. So here you go.</p>
    
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <HelloWorldImg />
    </div>
    <Link to="/hello-world/hello-world">Read More...</Link>
  </Layout>
)

export default IndexPage
