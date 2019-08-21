import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coy} from 'react-syntax-highlighter/dist/styles/hljs/github'
import Helmet from 'react-helmet'
const StyledCodeBlock = ({language, value}) => (
  <SyntaxHighlighter language={language} style={coy}>
    {value}
  </SyntaxHighlighter>
)

const MDComponents = {
  code: StyledCodeBlock
}

type Props = {
  children: string
}

const MarkdownPage = ({children}: Props) => {
  return (
    <div style={{margin: 'auto', maxWidth: '960px', minWidth: '600px'}}>
      <Helmet>
        <base target="_blank" /> // Needs new release of Helmet to work
        https://github.com/nfl/react-helmet/commit/420810c644f94c3743f7b088321dbd62a8037b7b
      </Helmet>
      <style scoped>
        {`
          @import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css";
        `}
      </style>
      <ReactMarkdown
        className="markdown-body"
        escapeHtml={false}
        renderers={MDComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownPage
