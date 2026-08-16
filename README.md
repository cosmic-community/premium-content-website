# Lumen — Premium Content Website

![App Preview](https://imgix.cosmicjs.com/fb53eaa0-9920-11f1-840f-f3d6107fb5e0-autopilot-photo-1492724441997-5dc865305da7-1786850235970.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, editorial premium content website built with Next.js and Cosmic. Free content is fully readable, while Premium content is gated behind a subscribe call-to-action — with clean badges, video embeds, and author profiles throughout.

## Features

- 🏠 Homepage with hero section, latest articles, and featured videos
- 🔍 Article listing page with filters for Content Type and Access Level
- 🔒 Paywall logic: Free articles show full body, Premium articles show summary + Upgrade CTA
- 🎬 Video articles embed the video URL and display duration
- ✍️ Author pages with bio, avatar, and their published articles
- 🎨 Clean, modern editorial design with strong typography and responsive layout
- 🏷️ Clear visual badges distinguishing Free vs Premium content and Article vs Video

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a812b87d2b3d9de631ee0f3&clone_repository=6a812d86d2b3d9de631ee152)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: A premium content website. Text articles and video content. Provide some content free and some paid."

### Code Generation Prompt

> Build a Next.js application for an online business called "Premium Content Website". The content is managed in Cosmic CMS with the following object types: authors, articles. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A premium content website with a paywall. Homepage featuring the latest articles and videos with hero section. Article listing page with filters for content type (Text Article / Video) and access level. Individual article pages that render the full body for Free content, but show only the summary plus an upgrade/subscribe call-to-action for Premium content. Video articles embed the video URL and show duration. Author pages with bio, avatar, and their published articles. Clean, modern editorial design with strong typography, responsive layout, and clear visual badges distinguishing Free vs Premium content.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [Cosmic](https://www.cosmicjs.com) headless CMS via [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)
- TypeScript (strict mode)
- Tailwind CSS with `@tailwindcss/typography`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing `authors` and `articles` object types

### Installation

```bash
bun install
```

Set the following environment variables (see your hosting platform's environment variable settings):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all articles with connected author data
const { objects: articles } = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single article by slug
const { object: article } = await cosmic.objects
  .findOne({ type: 'articles', slug: 'my-article' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from two Cosmic object types:

- **authors** — `name`, `bio`, `avatar`
- **articles** — `summary`, `content_type` (Text Article / Video), `access_level` (Free / Premium), `body`, `video_url`, `video_duration`, `featured_image`, `author` (connected object), `published_date`

Learn more about working with Cosmic in the [official docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables in your Vercel project settings
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the required environment variables in your Netlify site settings
5. Deploy
<!-- README_END -->