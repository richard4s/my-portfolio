import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const newHtml = html.replace(/<\/?[^>]+(>|$)/g, "")
  return (
    <Layout>
        <SEO title="Hello World" />
        <h1>{frontmatter.title}</h1>
        {frontmatter.date} ☕️<br /><br />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: newHtml }}
        />
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`