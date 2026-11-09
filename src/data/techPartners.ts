const logos = import.meta.glob('@/assets/tech-partners/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function numberFrom(path: string) {
  return Number(path.match(/(\d+)\.png$/)?.[1] ?? 0)
}

export const techPartners = Object.entries(logos)
  .sort((a, b) => numberFrom(a[0]) - numberFrom(b[0]))
  .map(([path, src]) => ({
    name: `Partner ${String(numberFrom(path)).padStart(2, '0')}`,
    src,
  }))
