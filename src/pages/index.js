import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Img from 'gatsby-image'
// // import Image from "../components/image"
// import HelloWorldImg from "../components/images/helloWorldImg"
import SEO from "../components/seo"
import HelloWorld from "./blog"
import { graphql } from 'gatsby'
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
    // const forImage = 
    //   <Img
    //     key={image.node.childImageSharp.fluid.src}
    //     fluid={image.node.childImageSharp.fluid}
    //     style={{ margin: '3rem 0' }}
    //   />

  return <Layout>
        <SEO title="Richard Oluwo's Blog" />
          {Posts}
          {/* <div>
          <Img src={Posts.node.frontmatter_2.featuredImage.childImageSharp.fluid.src} />
          </div> */}
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
        featuredImage {
          childImageSharp {
      fluid(maxWidth: 200) {
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
    }
}
`
