import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '70vh'
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
      <li key={title} className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>{title}</ListSubheader>
          {chapters.map(({ title, url }) => (
            <ListItem key={url} component={Link} to={url}>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </ul>
      </li>
    ))}
  </List>
)

export default withStyles(styles)(ChapterList)
