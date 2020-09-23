import React, { useEffect, useRef } from 'react'

interface Props {
  className?: string
  children: React.ReactNode
  maxHeight?: number
  scrollThumbStyle?: React.CSSProperties
  hiddenIfNotUsed?: boolean
}

const ReactScrollableComponent = ({
  children,
  className = '',
  maxHeight,
  scrollThumbStyle,
  hiddenIfNotUsed = true
}: Props) => {
  let scrolling = false
  const firstScrollableParent = (node?: HTMLElement): HTMLElement | null => {
    if (!node) return null
    if (
      node.scrollHeight > node.clientHeight &&
      ((node.style.overflow !== 'hidden' &&
        node.style.overflowY !== 'hidden') ||
        node.getAttribute('scroll-parent'))
    ) {
      node.setAttribute('scroll-parent', 'true')
      return node
    }

    return firstScrollableParent(node.parentElement || undefined)
  }
  const showThumb = () => {
    if (!scrollThumb.current || !hiddenIfNotUsed || scrolling) return
    scrollThumb.current!.style.visibility = 'visible'
    scrollThumb.current!.style.opacity = '1'
    scrolling = true
    setTimeout(() => {
      scrolling = false
      scrollThumb.current!.style.visibility = 'hidden'
      scrollThumb.current!.style.opacity = '0'
    }, 2000)
  }
  const container = useRef<HTMLDivElement>(null)
  const scrollThumb = useRef<HTMLDivElement>(null)
  const handler = (e: WheelEvent) => {
    if (!container.current) return
    showThumb()
    const delta = e.deltaY || e.detail
    let position = container.current?.scrollTop || 0
    if (position >= container.current!.scrollTop)
      container.current!.scrollTo({ top: container.current!.scrollHeight })
    container.current!.scrollTo({ top: position + delta })
    const top =
      (container.current!.scrollTop /
        (container.current!.scrollHeight - container!.current.clientHeight)) *
      100
    position = container.current?.scrollTop || 0
    const thumbOffset = (top / 100) * scrollThumb.current!.clientHeight
    scrollThumb.current!.style.top = `calc(${top}% + ${position}px - ${thumbOffset}px)`
    if (
      position > 0 &&
      position <
        container.current!.scrollHeight - container!.current.clientHeight
    ) {
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.style.overflow = 'hidden'
      e.stopPropagation()
    } else {
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.style.overflow = 'auto'
    }
  }
  const parentScrollHandler = () => {
    firstScrollableParent(
      container.current!.parentElement || undefined
    )!.style.overflow = 'auto'
  }
  const addWheelListener = () => {
    if ('onwheel' in document){
      container.current!.addEventListener('wheel', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.addEventListener('wheel', parentScrollHandler)
    } else if ('onmousewheel' in document) {
      container.current!.addEventListener('mousewheel', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.addEventListener('mousewheel', parentScrollHandler)
    } else {
      container.current!.addEventListener('MozMousePixelScroll', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.addEventListener('MozMousePixelScroll', parentScrollHandler)
    }
  }

  const removeWheelListener = () => {
    if ('onwheel' in document) {
      container.current!.removeEventListener('wheel', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.removeEventListener('wheel', parentScrollHandler)
    } else if ('onmousewheel' in document) {
      container.current!.removeEventListener('mousewheel', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.removeEventListener('mousewheel', parentScrollHandler)
    } else {
      container.current!.removeEventListener('MozMousePixelScroll', handler)
      if (firstScrollableParent(container.current!.parentElement || undefined))
        firstScrollableParent(
          container.current!.parentElement || undefined
        )!.removeEventListener('MozMousePixelScroll', parentScrollHandler)
    }
  }

  const initialize = () => {
    container.current!.scrollTo({ top: 0 })
    if (
      container.current!.clientHeight === 0 ||
      container.current!.clientHeight >= container.current!.scrollHeight
    )
      return
    const height =
      (container.current!.clientHeight / container.current!.scrollHeight) * 100
    scrollThumb.current!.style.height = `${height}%`
  }

  const detectMobile = (): boolean => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ]
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem)
    })
  }

  useEffect(() => {
    if (detectMobile()) {
      container.current!.style.overflow = 'auto'
      return () => true
    }

    addWheelListener()
    initialize()
    return removeWheelListener
  }, [])

  return (
    <div
      ref={container}
      style={{
        maxHeight: `${maxHeight}px` || 'auto',
        overflow: 'hidden',
        position: 'relative'
      }}
      className={className}
    >
      {children}
      <div
        ref={scrollThumb}
        style={{
          width: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '2px',
          ...scrollThumbStyle,
          position: 'absolute',
          right: '0',
          top: '0',
          transition: `visibility 0.2s opacity 0.2s`,
          visibility: hiddenIfNotUsed ? 'hidden' : 'visible',
          opacity: hiddenIfNotUsed ? 0 : 1
        }}
      />
    </div>
  )
}

export default ReactScrollableComponent
