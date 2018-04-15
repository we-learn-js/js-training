import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto'
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
})

const ChapterList = ({ chapters, classes }) => (
  <List className={classes.root} subheader={<li />}>
    {chapters.map(({ title, chapters }) => (
      <ListItem key={title} className={classes.listSection}>
        <List className={classes.root}>
          <ListSubheader>{title}</ListSubheader>
          {chapters.map(({ title, url }) => (
            <ListItem key={url} button component={Link} to={url}>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </ListItem>
    ))}
  </List>
)

export default withStyles(styles)(ChapterList)
