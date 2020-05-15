import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            <div>
              <OutboundLink href="https://www.twitter.com/richard4s">twitter</OutboundLink> • 
              <OutboundLink href="https://www.github.com/richard4s"> github</OutboundLink> • 
              <OutboundLink href="https://stackoverflow.com/users/9104897/richard4s"> stackoverflow</OutboundLink>
            </div>
            <OutboundLink href="https://www.richardoluwo.ga">Made by a big Leonardo Da Vinci fan.</OutboundLink>
            {` `}
            © {new Date().getFullYear()}.
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
