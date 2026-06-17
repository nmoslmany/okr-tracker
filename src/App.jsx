import { useState } from 'react'
import { INITIAL_OKRS } from './data/okrs.js'
import { THEMES, kPct, autoStatus, krStatus, statusStyle, okrPct, barColor, fmtTs } from './utils.js'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import DetailView from './components/DetailView.jsx'

export default function App() {
  const [view, setView] = useState('dashboard')
  const [selId, setSelId] = useState(null)
  const [theme, setTheme] = useState('blue')
  const [layout, setLayout] = useState('grid')
  const [quarter, setQuarter] = useState('All')
  const [editKrId, setEditKrId] = useState(null)
  const [okrs, setOkrs] = useState(INITIAL_OKRS)

  const t = THEMES[theme]

  function updKr(id, patch) {
    setOkrs(prev =>
      prev.map(o => ({
        ...o,
        krs: o.krs.map(k => (k.id === id ? { ...k, ...patch } : k)),
      }))
    )
  }

  const selOkr = okrs.find(o => o.id === selId) || null
  const filtOkrs = quarter === 'All'
    ? okrs
    : okrs.filter(o => o.krs.some(k => k.dq === quarter || k.dq === 'All'))

  const totPct = okrs.length
    ? Math.round(okrs.reduce((s, o) => s + okrPct(o), 0) / okrs.length)
    : 0

  const cnt = { OT: 0, AR: 0, BE: 0 }
  okrs.forEach(o => {
    const s = autoStatus(okrPct(o))
    s === 'On Track' ? cnt.OT++ : s === 'At Risk' ? cnt.AR++ : cnt.BE++
  })

  function goToDetail(id) {
    setSelId(id)
    setView('detail')
    setEditKrId(null)
  }

  function goBack() {
    setView('dashboard')
    setSelId(null)
    setEditKrId(null)
  }

  function addKr() {
    if (!selId) return
    const nk = {
      id: 'k' + Date.now(),
      text: 'New Key Result',
      target: 100, current: 0, unit: '%',
      dl: 'Q4 FY26/27', dq: 'Q4', ms: null, note: '', noteTs: null,
    }
    setOkrs(prev =>
      prev.map(o => o.id === selId ? { ...o, krs: [...o.krs, nk] } : o)
    )
  }

  function removeKr(krId) {
    setEditKrId(null)
    setOkrs(prev =>
      prev.map(o =>
        o.id === selId
          ? { ...o, krs: o.krs.filter(k => k.id !== krId) }
          : o
      )
    )
  }

  const detPct = selOkr ? okrPct(selOkr) : 0

  const detKrs = selOkr
    ? selOkr.krs.map((kr, i) => {
        const pct = kPct(kr)
        const status = krStatus(kr)
        const ss = statusStyle(status)
        const barC = barColor(pct)
        const isEd = editKrId === kr.id

        const bsty = (active, activeBg, activeCol, activeBrd) =>
          active
            ? { bg: activeBg, col: activeCol, brd: activeBrd }
            : { bg: 'white', col: '#95A0AA', brd: '#C8D0D6' }

        return {
          ...kr, pct, status, ss, barC, isEd,
          krNum: String(i + 1).padStart(2, '0'),
          hasNote: !!(kr.note && kr.note.trim()),
          noteTs: fmtTs(kr.noteTs),
          auto:  bsty(!kr.ms,              t.l,       t.p,       t.p),
          stOT:  bsty(kr.ms === 'On Track','#EBF5EE','#257150','#257150'),
          stAR:  bsty(kr.ms === 'At Risk', '#FFF8E0','#C89600','#C89600'),
          stBE:  bsty(kr.ms === 'Behind',  '#FCEAEA','#CC3333','#CC3333'),
          onEdit:          () => setEditKrId(kr.id),
          onStopEdit:      () => setEditKrId(null),
          onRemove:        () => removeKr(kr.id),
          onCurrentChange: e  => updKr(kr.id, { current: parseFloat(e.target.value) || 0 }),
          onTargetChange:  e  => updKr(kr.id, { target:  parseFloat(e.target.value) || 0 }),
          onNoteChange:    e  => updKr(kr.id, { note: e.target.value, noteTs: new Date().toISOString() }),
          onSetAuto: () => updKr(kr.id, { ms: null }),
          onSetOT:   () => updKr(kr.id, { ms: 'On Track' }),
          onSetAR:   () => updKr(kr.id, { ms: 'At Risk' }),
          onSetBE:   () => updKr(kr.id, { ms: 'Behind' }),
        }
      })
    : []

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", minHeight: '100vh', background: '#F0F2F4', color: '#233737' }}>
      <Header
        theme={theme}
        setTheme={setTheme}
        t={t}
        department="Data Governance Office"
        fiscalYear="FY 26/27"
        leader="Nedal Moslmany"
      />

      {view === 'dashboard' && (
        <Dashboard
          t={t}
          filtOkrs={filtOkrs}
          okrs={okrs}
          totPct={totPct}
          cnt={cnt}
          quarter={quarter}
          setQuarter={setQuarter}
          layout={layout}
          setLayout={setLayout}
          onCardClick={goToDetail}
        />
      )}

      {view === 'detail' && selOkr && (
        <DetailView
          t={t}
          selOkr={selOkr}
          detPct={detPct}
          detKrs={detKrs}
          onBack={goBack}
          onAddKr={addKr}
        />
      )}
    </div>
  )
}
