import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

const ChapterList = ({chapters}) => (
  <ul className="jst-ChapterList">
    {chapters.map(({title, chapters}) => (
      <li key={title} className="jst-ChapterList-Section">
        <span className="jst-ChapterList-Title">{title}</span>
        <ul>
          {chapters.map(({title, url}) => (
            <li key={url.route} className="jst-ChapterList-Chapter">
              <Link className="jst-ChapterList-Link" to={url.route}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
)

export default ChapterList
