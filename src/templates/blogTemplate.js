import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Img from 'gatsby-image'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const newHtml = html.replace(/<\/?[^>]+(>|$)/g, "")
  return (
    <Layout>
        <SEO title={frontmatter.title} />
        <h1>{frontmatter.title}</h1>
        {frontmatter.date} ☕️ • {markdownRemark.timeToRead} min read<br /><br />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: newHtml }}
        />
        <br />
        <Img fluid={markdownRemark.frontmatter.featuredImage.childImageSharp.fluid} />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImage {
          childImageSharp {
      fluid(maxWidth: 1200) {
        base64
        tracedSVG
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        originalImg
        originalName
      }
    }
        }
      }
    }
  }
`