import { Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'

interface ArticleGridProps {
  articles: Article[]
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        if (!article || !article.id) {
          return null
        }
        return <ArticleCard key={article.id} article={article} />
      })}
    </div>
  )
}