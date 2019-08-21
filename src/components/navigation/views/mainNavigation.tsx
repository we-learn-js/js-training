import React from 'react'
import PageIcon from '@atlaskit/icon/glyph/page'
import ScreenIcon from '@atlaskit/icon/glyph/screen'
import BitbucketReposIcon from '@atlaskit/icon/glyph/bitbucket/repos'
import HomeIcon from '@atlaskit/icon/glyph/home'
import LinkItem from '../LinkItem'
import {
  documentsNavigationId,
  slideshowsNavigationId
} from '../../providers/useChaptersNavigationView'

export const mainNavigationViewId = 'main-nav'
const mainNavigationView = {
  id: mainNavigationViewId,
  type: 'product',
  getItems: () => [
    {
      type: 'HeaderSection',
      id: 'main-nav:header',
      items: [
        {
          type: 'Wordmark',
          wordmark: () => <h1>JS Training</h1>,
          id: 'js-training-wordmark'
        }
      ]
    },
    {
      type: 'MenuSection',
      nestedGroupKey: 'menu',
      id: 'main-nav:menu',
      parentId: null,
      items: [
        {
          type: 'InlineComponent',
          component: LinkItem,
          id: 'home',
          before: HomeIcon,
          text: 'Home',
          to: '/'
        },
        {
          type: 'Item',
          id: 'documents',
          goTo: documentsNavigationId,
          before: PageIcon,
          text: 'Documents'
          // to: urls.documents
        },
        {
          type: 'Item',
          id: 'slideshows',
          goTo: slideshowsNavigationId,
          before: ScreenIcon,
          text: 'Slideshows'
          // to: urls.slideshows
        },
        {
          type: 'Item',
          id: 'repository',
          before: BitbucketReposIcon,
          text: 'Repository',
          href: 'https://github.com/we-learn-js/js-training/',
          target: '_blank'
        }
      ]
    }
  ]
}

export default mainNavigationView
