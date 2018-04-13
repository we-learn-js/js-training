import React from 'react'
import space from 'to-space-case'
import { Link } from 'react-router-dom'
import chapters from "../../domain/config/chapters"

export default () => (
  <div className="js-training-listing">
    <div className="js-training-listing-info">
      <h1 className="js-training-listing-title">JS Training</h1>
      <ul className="js-training-listing-links">
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
      </ul>
    </div>
    <ol className="js-training-listing-list">
      {Object.keys(chapters).map(chapter => (
        <li key={chapter}>
          <Link to={`/${chapter}#/`}>{space(chapter)}</Link>
        </li>
      ))}
    </ol>
  </div>
)
