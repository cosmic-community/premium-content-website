interface VideoEmbedProps {
  url?: string
}

function getEmbedUrl(url: string): string | null {
  try {
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    )
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return null
  } catch (error) {
    return null
  }
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  if (!url) return null

  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-video w-full items-center justify-center rounded-2xl bg-ink text-white hover:bg-ink-light"
      >
        ▶ Watch Video
      </a>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
      <iframe
        src={embedUrl}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video content"
      />
    </div>
  )
}