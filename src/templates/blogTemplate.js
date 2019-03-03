import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Img from 'gatsby-image'
import Disqus from 'disqus-react'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const newHtml = html.replace(/<\/p>/g, "");

  const disqusConfig = {
    url: `https://blog.richardoluwo.ga/${frontmatter.path}`,
    identifier: `${frontmatter.path}`,
    title: frontmatter.title,
  }

  return (
    <Layout>
        <SEO title={frontmatter.title} />
        <h1>{frontmatter.title}</h1>
        {frontmatter.date} ☕️ • {markdownRemark.timeToRead} min read<br /><br />
        <Img fluid={markdownRemark.frontmatter.featuredImage.childImageSharp.fluid} />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: newHtml }}
        />
        <br />
        <Disqus.DiscussionEmbed shortname="blog-richardoluwo-ga" config={disqusConfig} />
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
  }`