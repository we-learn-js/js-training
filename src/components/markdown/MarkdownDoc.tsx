import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'

const StyledCodeBlock = ({node, inline, className, children, ...props}: any) => {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter language={match[1]} style={coy as any}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

const MDComponents = {
  code: StyledCodeBlock
}

type Props = {
  children: string
}

const MarkdownPage = ({children}: Props) => {
  return (
    <div style={{margin: 'auto', maxWidth: '960px', minWidth: '600px'}}>
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MDComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownPage
