import React from 'react'
import ChapterList from '../../../components/Chapter/List'
import Content from '../../../components/Layout/Content'
import Typography from 'material-ui/Typography'
import { withServiceResponse } from '../../../components/Hoc/Domain'

export default withServiceResponse('ChapterListService')(
  ({ ChapterListService, ...props }) =>
    ChapterListService ? (
      <Content hasHeader>
        <Typography gutterBottom variant="display2" component="h2">
          List of Chapters
        </Typography>
        <ChapterList {...props} chapters={ChapterListService} />
      </Content>
    ) : null
)
