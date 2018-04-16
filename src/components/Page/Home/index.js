import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ImageConstruction from '../../3dScene/ImageConstruction'
import Card, { CardActions } from '../../Card/HomeTopic'
import Content from '../../Layout/Content'
import Grid from 'material-ui/Grid'
import './index.css'

const images = {
  practice: require('./images/card-practice.png'),
  slideshow: require('./images/card-slideshow.png'),
  wiki: require('./images/card-wiki.png')
}
const styles = {
  position: 'relative',
  width: '100vw',
  height: '70vh',
  minHeight: '300px',
  maxHeight: '600px',
  background: '#333'
}

const Background = ({ children }) => (
  <div style={styles}>
    <ImageConstruction />
    {children}
  </div>
)

export default () => (
  <React.Fragment>
    <Background>
      <div className="jst-Home_SubHeader">
        <Typography variant="display3" color="primary">
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
    </Background>
    <Content>
      <Grid container justify="center" spacing={24}>
        <Grid item xs>
          <Card
            title="Slideshow"
            description="Web slideshows for lectures."
            image={images.slideshow}
          >
            <Button color="secondary" component={Link} to="/chapters">
              Go to slideshows
            </Button>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            title="Wiki"
            description="Text formatted content."
            image={images.wiki}
          >
            <Button
              color="secondary"
              href="https://github.com/we-learn-js/js-training/wiki"
            >
              Go to Wiki
            </Button>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            title="Practice project"
            description="Apply your knowledge."
            image={images.practice}
          >
            <Button
              color="secondary"
              href="https://github.com/we-learn-js/js-training-practice"
            >
              Go to repo
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Content>
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
