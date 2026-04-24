import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(-35deg)`
      dot.classList.add('cursor-dot--visible')
    }

    const onLeave = () => {
      dot.classList.remove('cursor-dot--visible')
      ring.classList.remove('cursor-ring--visible', 'cursor-ring--grow')
    }

    const onEnter = () => {
      dot.classList.add('cursor-dot--visible')
    }

    const animateRing = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12
      ringPos.y += (mouse.y - ringPos.y) * 0.12
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.dataset.cursor === 'hover'

      dot.classList.toggle('cursor-dot--hover', isClickable)
      ring.classList.toggle('cursor-ring--visible', isClickable)
      ring.classList.toggle('cursor-ring--grow', isClickable)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onPointerOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onPointerOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
