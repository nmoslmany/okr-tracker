export const THEMES = {
  blue:   { h: '#233737', p: '#3A7391', a: '#64AAB9', l: '#EBF4F8' },
  green:  { h: '#004132', p: '#257150', a: '#96A02D', l: '#EBF5EE' },
  orange: { h: '#1A2B2B', p: '#CC5500', a: '#FF6C00', l: '#FFF3EB' },
}

export function kPct(kr) {
  if (kr.target === 0) return kr.current === 0 ? 100 : 0
  return Math.min(100, Math.round((kr.current / kr.target) * 100))
}

export function autoStatus(pct) {
  return pct >= 75 ? 'On Track' : pct >= 45 ? 'At Risk' : 'Behind'
}

export function krStatus(kr) {
  return kr.ms || autoStatus(kPct(kr))
}

export function statusStyle(s) {
  if (s === 'On Track') return { col: '#257150', bg: '#EBF5EE', dot: '#257150' }
  if (s === 'At Risk')  return { col: '#C89600', bg: '#FFF8E0', dot: '#DCB900' }
  return { col: '#CC3333', bg: '#FCEAEA', dot: '#CC3333' }
}

export function okrPct(okr) {
  if (!okr.krs.length) return 0
  return Math.round(okr.krs.reduce((a, k) => a + kPct(k), 0) / okr.krs.length)
}

export function barColor(pct) {
  return pct >= 75 ? '#257150' : pct >= 45 ? '#DCB900' : '#CC3333'
}

export function fmtTs(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return (
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  )
}
