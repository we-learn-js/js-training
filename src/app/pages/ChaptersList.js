import React from 'react'
import ChapterList from '../../components/Chapter/List'
import Container from '../../components/Header/ContentContainer'
import { withServiceResponse } from '../../components/Hoc/Domain'

export default withServiceResponse('ChapterListService')(
  ({ ChapterListService, ...props }) =>
    ChapterListService ? (
      <Container>
        <ChapterList {...props} chapters={ChapterListService} />
      </Container>
    ) : null
)
