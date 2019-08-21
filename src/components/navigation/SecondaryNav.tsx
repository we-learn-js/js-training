import React from 'react'
import {Link} from 'gatsby'
import {HeaderSection, Item, MenuSection} from '@atlaskit/navigation-next'
import styled from 'styled-components'

const NoLinksStyle = styled.span`
  a {
    text-decoration: none;
  }
`

type Props = {
  heading: React.ReactNode,
  links: Array<{
    text: string,
    to: string
  }>
}

const DocumentsNav = ({heading, links}: Props) => {
  return (
    <>
      <HeaderSection>
        {({className}) => <div className={className}>{heading}</div>}
      </HeaderSection>
      <MenuSection>
        {({className}) => (
          <div className={className}>
            <NoLinksStyle>
              {links.map(link => (
                <Link to={link.to}>
                  <Item text={link.text} />
                </Link>
              ))}
            </NoLinksStyle>
          </div>
        )}
      </MenuSection>
    </>
  )
}

export default DocumentsNav
