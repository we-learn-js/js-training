import React from 'react'
import {Link} from 'gatsby'
import PageIcon from '@atlaskit/icon/glyph/page'
import ScreenIcon from '@atlaskit/icon/glyph/screen'
import BitbucketReposIcon from '@atlaskit/icon/glyph/bitbucket/repos'
import {JiraWordmark} from '@atlaskit/logo'
import HomeIcon from '@atlaskit/icon/glyph/home'
import {
  HeaderSection,
  Item,
  MenuSection,
  Wordmark
} from '@atlaskit/navigation-next'
import styled from 'styled-components'
import {urls} from '../../constants'

const NoLinksStyle = styled.span`
  a {
    text-decoration: none;
  }
`

const PrimaryNav = () => (
  <NoLinksStyle>
    <HeaderSection>
      {({className}) => (
        <div className={className}>
          <Wordmark wordmark={JiraWordmark} />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({className}) => (
        <div className={className}>
          <Link to={'/'}>
            <Item before={HomeIcon} text="Home" />
          </Link>
          <Link to={urls.documents}>
            <Item before={PageIcon} text="Documents" />
          </Link>
          <Link to={urls.slideshows}>
            <Item before={ScreenIcon} text="Slideshows" />
          </Link>
          <Item
            before={BitbucketReposIcon}
            text="Repository"
            href="https://github.com/we-learn-js/js-training/"
            target="_blank"
          />
        </div>
      )}
    </MenuSection>
  </NoLinksStyle>
)

export default PrimaryNav
