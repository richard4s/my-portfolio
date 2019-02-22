import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Img from 'gatsby-image'
// // import Image from "../components/image"
// import HelloWorldImg from "../components/images/helloWorldImg"
import SEO from "../components/seo"
import HelloWorld from "./blog"
// import SecondPost from "./second-post/second-post"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <HelloWorld key={edge.node.id} post={edge.node} />)
    // const PictureWrapper = styled(Img)

  return <Layout>
        <SEO title="Richard Oluwo's Blog" />
          {Posts}
          {/* <PictureWrapper fluid={Posts.node.frontmatter.featuredImage.childImageSharp.sizes} /> */}
        </Layout>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          html
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
