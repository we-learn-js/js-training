import React from 'react'
import styled from 'styled-components'

const Heading = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  font-size: 24px;
  font-family: 'system-ui';
  color: #0052cc;

  > span {
    margin-left: 10px;
  }
`

const NavigationHeading = ({Icon, text}) => (
  <Heading>
    <Icon size="large" primaryColor="#0052cc" />
    <span>{text}</span>
  </Heading>
)

export default NavigationHeading
