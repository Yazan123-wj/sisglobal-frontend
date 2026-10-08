export default function Arrow({ dir = 'ne' }: { dir?: 'ne' | 'right' | 'left' }) {
  const rotate = dir === 'right' ? 45 : dir === 'left' ? -135 : 0
  return (
    <svg
      className="icon-arrow"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <path
        d="M4 12 12 4M12 4H6.25M12 4v5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
