import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// // import Image from "../components/image"
// import HelloWorldImg from "../components/images/helloWorldImg"
import SEO from "../components/seo"
import HelloWorld from "./hello-world/hello-world"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <HelloWorld key={edge.node.id} post={edge.node} />)

  return <Layout>
        <SEO title="Richard Oluwo's Blog" />
          {Posts}
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