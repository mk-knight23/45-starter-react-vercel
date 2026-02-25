/**
 * Image Optimization Component
 * Lazy loading, WebP support, and responsive images
 */

import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  webpSrc?: string
  placeholder?: string
  blurDataURL?: string
  sizes?: string
  quality?: number
  className?: string
}

export function OptimizedImage({
  src,
  webpSrc,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  blurDataURL,
  sizes = '100vw',
  quality = 75,
  className = '',
  alt = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Generate responsive srcset
  const generateSrcSet = (baseSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536]
    return widths
      .map((width) => {
        // Replace extension with _{width}.webp or _{width}.jpg
        const url = new URL(baseSrc, window.location.origin)
        const ext = url.pathname.split('.').pop()
        const basePath = url.pathname.replace(`.${ext}`, '')
        return `${basePath}_${width}.webp ${width}w`
      })
      .join(', ')
  }

  if (hasError) {
    return (
      <div className={cn('bg-gray-200 dark:bg-gray-800 flex items-center justify-center', className)}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder/Blur */}
      {!isLoaded && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      <picture>
        {webpSrc && isInView && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          ref={imgRef}
          src={isInView ? src : placeholder}
          srcSet={isInView ? generateSrcSet(src) : undefined}
          sizes={sizes}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      </picture>
    </div>
  )
}

/**
 * Background Image Component
 */
export function BackgroundImage({
  src,
  className = '',
  children,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
  }, [src])

  return (
    <div
      className={cn('relative bg-cover bg-center', className)}
      style={{ backgroundImage: isLoaded ? `url(${src})` : undefined }}
      {...props}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {children}
    </div>
  )
}

/**
 * Avatar Component with lazy loading
 */
export function Avatar({
  src,
  alt,
  size = 'md',
  className = ''
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <div className={cn('rounded-full overflow-hidden bg-gray-200', sizeClasses[size], className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

/**
 * Image Gallery Component
 */
export function ImageGallery({
  images,
  onImageClick
}: {
  images: Array<{ src: string; alt: string; webpSrc?: string }>
  onImageClick?: (index: number) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onImageClick?.(index)}
        >
          <OptimizedImage
            src={image.src}
            webpSrc={image.webpSrc}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default OptimizedImage
