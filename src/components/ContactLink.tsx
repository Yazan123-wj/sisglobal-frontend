import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { contactTo, type ContactCta } from '@/data/contact'

export default function ContactLink({
  className,
  children,
  onClick,
  intent,
  topic,
}: {
  className?: string
  children: ReactNode
  onClick?: () => void
  intent?: ContactCta
  topic?: string
}) {
  const { pathname, hash } = useLocation()
  const fromTopic = topic ?? (hash ? hash.replace('#', '') : undefined)
  return (
    <Link className={className} to={contactTo(pathname, intent, fromTopic)} onClick={onClick}>
      {children}
    </Link>
  )
}
