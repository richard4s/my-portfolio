// import React from "react"
// import { Link } from "gatsby"

// import Layout from "../../components/layout"
// import SEO from "../../components/seo"

// const helloWorld = () => (
//   <Layout>
//     <SEO title="Hello-World" />
//       <h1>Hello World! <span role="img" aria-label="Wave">🖐</span></h1>
//       <h5>February 21, 2019. <span role="img" aria-label="Coffee">☕️</span></h5>
//       <p>As is the case with almost everything I can imagine, a friendly introduction to my blog.
//       The truth is I have actually been postponing publishing of my blog for a while.
//       Right now just seems like the right time. So here you go.</p>
//       <p>A little more from the hello world page.</p>
//     <Link to="/">Go back to the homepage</Link>
//   </Layout>
// )

// export default helloWorld

import React from "react"
import { Link } from "gatsby"

const Blog = ({ post }) => (
  <div>
    <Link style={{ textDecoration: `none`, color: `#000`}} to={post.frontmatter.path}>
      <h1>{post.frontmatter.title}</h1>
    </Link>
    {post.frontmatter.date} ☕️ • {post.timeToRead} min read<br/><br/>
    <p>{post.excerpt.replace(/<\/?[^>]+(>|$)/g, "")}</p>
  </div>
)

export default Blog
