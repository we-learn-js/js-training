import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

export default () => (
  <React.Fragment>
    <div style={{ padding: '20px' }}>
      <Typography variant="display3" align="center" gutterBottom>
        JS Training
      </Typography>
      <Button
        size="large"
        to="/chapters"
        color="primary"
        fullWidth
        component={Link}
        variant="raised"
      >
        Browse Chapters
      </Button>
    </div>
  </React.Fragment>
)
