import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { contactTo, type ContactCta } from '@/data/contact'

export default function ContactLink({
  className,
  children,
  onClick,
  intent,
}: {
  className?: string
  children: ReactNode
  onClick?: () => void
  intent?: ContactCta
}) {
  const { pathname } = useLocation()
  return (
    <Link className={className} to={contactTo(pathname, intent)} onClick={onClick}>
      {children}
    </Link>
  )
}
