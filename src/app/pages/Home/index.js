import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Background from '../../../components/3dScene/ImageConstruction'
import './index.css'

export default () => (
  <React.Fragment>
    <Background />
    <div className="jst-Home_SubHeader">
      <Typography variant="display4" color="primary" className="jst-Home_Title">
        JS Training
      </Typography>
      <Button
        size="large"
        to="/chapters"
        color="primary"
        component={Link}
        variant="flat"
        size="large"
      >
        Browse Chapters
      </Button>
    </div>
    {/* <ul>
      <li>
        <a href="https://js-training.now.sh/" target="_blank">
          https://js-training.now.sh/
        </a>
      </li>
      <li>
        <a href="https://github.com/we-learn-js/js-training" target="_blank">
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
    </ul> */}
  </React.Fragment>
)
