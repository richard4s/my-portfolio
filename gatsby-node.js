// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// // You can delete this file if you're not using it
// const path = require("path")
// const { createFilePath } = require("gatsby-source-filesystem")

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(
//         `
//           {
//             allMarkdownRemark(
//               sort: { fields: [frontmatter___date], order: DESC }
//               limit: 1000
//             ) {
//               edges {
//                 node {
//                   fields {
//                     slug
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }

//         // ...

//         // Create blog-list pages
//         const posts = result.data.allMarkdownRemark.edges
//         const postsPerPage = 6
//         const numPages = Math.ceil(posts.length / postsPerPage)
//         Array.from({ length: numPages }).forEach((_, i) => {
//           createPage({
//             path: i === 0 ? `/blog` : `/blog/${i + 1}`,
//             component: path.resolve("./src/templates/blog-list-template.js"),
//             context: {
//               limit: postsPerPage,
//               skip: i * postsPerPage,
//             },
//           })
//         })
//       })
//     )
//   })
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}