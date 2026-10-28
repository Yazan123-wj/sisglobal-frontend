import type { ReactNode } from 'react'

export default function IntroSplit({
  title,
  kicker,
  children,
}: {
  title: string
  kicker?: string
  children?: ReactNode
}) {
  return (
    <header className="intro-split">
      <div className="intro-split-title">
        {kicker ? <span>{kicker}</span> : null}
        <h2>{title}</h2>
      </div>
      {children ? <div className="intro-split-copy">{children}</div> : null}
    </header>
  )
}
