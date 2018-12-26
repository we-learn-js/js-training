import React from 'react'
import {withStyles} from 'material-ui/styles'
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
}

function HomeTopicCard(props) {
  const {classes, title, description, children, image} = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions>{children}</CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(HomeTopicCard)
