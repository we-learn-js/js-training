import React from 'react'
import ChapterList from '../../components/Chapter/List'
import { withServiceResponse } from '../../components/Hoc/Domain'

export default withServiceResponse('ChapterListService')(
  ({ ChapterListService, ...props }) => (
    <React.Fragment>
      <div>
        <h1>JS Training</h1>
        <ul>
          <li>
            <a href="https://js-training.now.sh/" target="_blank">
              https://js-training.now.sh/
            </a>
          </li>
          <li>
            <a
              href="https://github.com/we-learn-js/js-training"
              target="_blank"
            >
              github//js-training
            </a>
          </li>
          <li>
            <a
              href="https://github.com/we-learn-js/js-training-practice"
              target="_blank"
            >
              github//js-training-practice
            </a>
          </li>
        </ul>
      </div>
      <ChapterList {...props} chapters={ChapterListService} />
    </React.Fragment>
  )
)
