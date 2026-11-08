import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

import { contactTo } from '@/data/contact'

export default function ContactLink({
  className,
  children,
  onClick,
}: {
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const { pathname } = useLocation()
  return (
    <Link className={className} to={contactTo(pathname)} onClick={onClick}>
      {children}
    </Link>
  )
}
