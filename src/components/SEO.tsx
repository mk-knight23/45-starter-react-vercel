/**
 * SEO Meta Tags Management
 * Dynamic meta tags for better SEO
 */

import { Helmet } from 'react-helmet-'

interface MetaTags {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
  canonical?: string
}

interface SEOProps extends MetaTags {
  titleTemplate?: string
  defaultTitle?: string
}

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  noIndex = false,
  canonical,
  titleTemplate = '%s | React Vercel Starter',
  defaultTitle = 'React Vercel Starter'
}: SEOProps) {
  const fullTitle = title ? titleTemplate.replace('%s', title) : defaultTitle

  // Get current URL if not provided
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  // Default image
  const defaultImage = image || '/og-image.png'

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={currentUrl} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={defaultImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  )
}

/**
 * Structured Data (JSON-LD)
 */
interface StructuredDataProps {
  type: 'WebSite' | 'Article' | 'Organization' | 'Person'
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    }

    return JSON.stringify(baseSchema)
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateSchema() }}
    />
  )
}

/**
 * WebSite Schema
 */
export function WebSiteSchema({ name, url, description }: {
  name: string
  url: string
  description?: string
}) {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name,
        url,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }}
    />
  )
}

/**
 * Article Schema
 */
export function ArticleSchema({
  title,
  description,
  image,
  author,
  publishedTime,
  modifiedTime,
  url
}: {
  title: string
  description: string
  image?: string
  author: string
  publishedTime: string
  modifiedTime?: string
  url: string
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline: title,
        description,
        image,
        author: {
          '@type': 'Person',
          name: author
        },
        datePublished: publishedTime,
        dateModified: modifiedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        }
      }}
    />
  )
}

/**
 * Organization Schema
 */
export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  socialLinks
}: {
  name: string
  url: string
  logo?: string
  description?: string
  socialLinks?: Record<string, string>
}) {
  return (
    <StructuredData
      type="Organization"
      data={{
        name,
        url,
        logo,
        description,
        sameAs: socialLinks ? Object.values(socialLinks) : undefined
      }}
    />
  )
}

/**
 * Breadcrumb Schema
 */
export function BreadcrumbSchema({ items }: {
  items: Array<{ name: string; url: string }>
}) {
  const itemList = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))

  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: itemList
      }}
    />
  )
}

export default SEO
