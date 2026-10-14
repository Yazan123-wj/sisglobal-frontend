export default function BrandMark({ mark }: { mark: string }) {
  return (
    <svg className={`brand-logo brand-logo-${mark}`} viewBox={mark === 'apple' ? '0 0 24 24' : '0 0 32 32'} aria-hidden="true">
      {mark === 'aramco' && <circle cx="16" cy="16" r="12" />}
      {mark === 'sabic' && <path d="M16 4 28 16 16 28 4 16Z" />}
      {mark === 'stc' && <path d="M8 22c4-8 12-8 16 0M6 17c6-10 14-10 20 0M8 12c4-6 12-6 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />}
      {mark === 'snb' && <path d="M7 24V12l9-6 9 6v12H7Zm4-3h10v-8l-5-3.4L11 13v8Z" />}
      {mark === 'moh' && <path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7V6Z" />}
      {mark === 'maaden' && <path d="M4 24 12 8l5 9 4-6 7 13H4Z" />}
      {mark === 'alat' && <path d="M16 5 27 11.5v9L16 27 5 20.5v-9L16 5Zm0 6.2L11 14.2v3.6L16 20.8 21 17.8v-3.6L16 11.2Z" />}
      {mark === 'microsoft' && <path d="M6 6h9v9H6zm11 0h9v9h-9zM6 17h9v9H6zm11 0h9v9h-9z" />}
      {mark === 'cisco' && <path d="M5 20h3l1-8h2l1 8h3l1-8h2l1 8h3l-2-12h-4l-1 6-1-6h-4l-1 6-1-6H7L5 20Z" />}
      {mark === 'hp' && <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      {mark === 'hp' && <path d="M11 21V11h3.2c2.6 0 4.2 1.3 4.2 3.4S16.8 18 14.3 18H14v3h-3Zm3-5.6h.4c.9 0 1.5-.5 1.5-1.2S15.3 13 14.4 13H14v2.4Z" />}
      {mark === 'dell' && <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      {mark === 'dell' && <path d="M10 16.8 16 10l6 6.8H10Z" />}
      {mark === 'fortinet' && <path d="M16 5 27 11v10L16 27 5 21V11L16 5Z" />}
      {mark === 'apple' && <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.107-.987 3.957-.987 1.851 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.065-3.623-2.293-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />}
      {mark === 'lenovo' && <path d="M6 10h20v12H6V10Zm3 3.2v5.6h2.1V16h2.4c1.8 0 2.9-1 2.9-2.4S15.4 11.2 13.6 11.2H9Zm2.1 1.8h1.5c.6 0 .9.3.9.7s-.3.7-.9.7H11.1v-1.4Zm7.4 3.8V13.2h2.1v1.1c.3-.8 1.1-1.3 2.1-1.3.3 0 .6 0 .8.1v1.9c-.2-.1-.5-.2-.8-.2-.8 0-1.4.6-1.4 1.6v1.8h-2.8Z" />}
      {mark === 'nextivity' && <path d="M7 8h6.4L18 16.2 21.2 8H25L19.1 24h-6.2L7 8Zm3.4 2.6 3.1 7.8h.1l3.2-7.8h-6.4Z" />}
    </svg>
  )
}
