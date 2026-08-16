// components/Markdown.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
  className?: string
}

const proseClasses =
  'prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink-light prose-li:text-ink-light prose-strong:text-ink prose-a:text-accent prose-blockquote:border-accent prose-blockquote:text-ink-light'

export default function Markdown({ content, className }: MarkdownProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className ? `${proseClasses} ${className}` : proseClasses}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
