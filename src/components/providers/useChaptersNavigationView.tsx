import React, {useMemo} from 'react'
import useChapters from './useChapters'
import LinkItem from '../navigation/LinkItem'

import IssueIcon from '@atlaskit/icon/glyph/issue'
import IssuesIcon from '@atlaskit/icon/glyph/issues'
import DocumentsIcon from '@atlaskit/icon/glyph/documents'
import DocumentIcon from '@atlaskit/icon/glyph/document'
import {mainNavigationViewId} from '../navigation/views'
import NavigationHeading from '../navigation/NavigationHeading'
import {sections} from '../../constants'

export const documentsNavigationId = 'documents-nav'
export const slideshowsNavigationId = 'slideshows-nav'

const useChaptersView = (type: 'slideshow' | 'document') => {
  const chapters = useChapters()
  const chaptersView = useMemo(
    () => {
      const {navId, title, Icon, HeaderIcon} =
        type === 'document'
          ? {
              navId: documentsNavigationId,
              Icon: DocumentIcon,
              HeaderIcon: DocumentsIcon,
              title: 'Documents'
            }
          : {
              navId: slideshowsNavigationId,
              Icon: IssueIcon,
              HeaderIcon: IssuesIcon,
              title: 'Slideshows'
            }

      const chaptersItems = sections.flatMap(s => {
        const sectionChapters = s.chapters.map(filename =>
          chapters.find(chapter => chapter.filename === filename)
        )
        return [
          {
            type: 'SectionHeading',
            id: s.title,
            text: s.title
          },
          ...sectionChapters.map(c => ({
            type: 'InlineComponent',
            component: LinkItem,
            id: c.paths[type],
            before: Icon,
            text: c.title,
            to: c.paths[type]
          }))
        ]
      })

      return {
        id: navId,
        type: 'container',
        getItems: () => [
          {
            type: 'HeaderSection',
            id: `${navId}:header`,
            items: [
              {
                type: 'ContainerHeader',
                component: () => (
                  <NavigationHeading Icon={HeaderIcon} text={title} />
                ),
                id: 'wordmark'
              },
              {
                type: 'BackItem',
                id: 'back-item',
                goTo: mainNavigationViewId,
                text: 'Back to main menu'
              }
            ]
          },

          {
            type: 'MenuSection',
            nestedGroupKey: 'menu',
            id: `${navId}:menu`,
            parentId: null,
            items: chaptersItems
          }
        ]
      }
    },
    [type]
  )

  return chaptersView
}

export default useChaptersView
