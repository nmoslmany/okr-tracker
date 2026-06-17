import { okrPct, autoStatus, krStatus, statusStyle } from '../utils.js'

const QUARTERS = ['All', 'Q1', 'Q2', 'Q3', 'Q4']

export default function Dashboard({ t, filtOkrs, totPct, cnt, quarter, setQuarter, layout, setLayout, onCardClick }) {
  const gridStyle = layout === 'grid'
    ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '0 32px 40px' }
    : { display: 'flex', flexDirection: 'column', gap: 10, padding: '0 32px 40px' }

  return (
    <>
      {/* Rollup strip */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E6EA', padding: '15px 32px', display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#95A0AA', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7 }}>
            Overall Progress — FY 26/27
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F5F7F9', border: '1px solid #E2E6EA', borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ flex: 1, height: 11, background: '#E2E6EA', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: t.p, width: totPct + '%', borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#233737', minWidth: 38, textAlign: 'right' }}>{totPct}%</span>
          </div>
        </div>

        <div style={{ width: 1, height: 38, background: '#E2E6EA', flexShrink: 0 }} />

        <div style={{ display: 'flex', gap: 22, flexShrink: 0 }}>
          <StatCount value={cnt.OT} label="On Track" color="#257150" />
          <StatCount value={cnt.AR} label="At Risk" color="#C89600" />
          <StatCount value={cnt.BE} label="Behind" color="#CC3333" />
        </div>

        <div style={{ width: 1, height: 38, background: '#E2E6EA', flexShrink: 0 }} />

        <button
          className="no-print"
          onClick={() => window.print()}
          style={{ background: 'none', border: '1px solid #C8D0D6', borderRadius: 6, padding: '6px 15px', fontSize: 12, color: '#5F696E', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#5F696E'; e.currentTarget.style.color = '#233737' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8D0D6'; e.currentTarget.style.color = '#5F696E' }}
        >
          Export / Print
        </button>
      </div>

      {/* Controls bar */}
      <div className="no-print" style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {QUARTERS.map(q => {
            const active = q === quarter
            return (
              <button
                key={q}
                onClick={() => setQuarter(q)}
                style={{
                  padding: '5px 13px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontWeight: 500,
                  transition: 'all 0.15s',
                  background: active ? t.p : 'white',
                  color: active ? 'white' : '#6E7C84',
                  border: `1px solid ${active ? t.p : '#C8D0D6'}`,
                }}
              >
                {q}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setLayout(l => l === 'grid' ? 'list' : 'grid')}
          style={{ background: 'white', border: '1px solid #C8D0D6', borderRadius: 6, padding: '5px 13px', fontSize: 12, color: '#5F696E', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#5F696E'; e.currentTarget.style.color = '#233737' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8D0D6'; e.currentTarget.style.color = '#5F696E' }}
        >
          {layout === 'grid' ? 'List view' : 'Grid view'}
        </button>
      </div>

      {/* OKR cards */}
      <div style={gridStyle}>
        {filtOkrs.map(okr => <OKRCard key={okr.id} okr={okr} t={t} onClick={() => onCardClick(okr.id)} />)}
      </div>
    </>
  )
}

function StatCount({ value, label, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#95A0AA', textTransform: 'uppercase', letterSpacing: '0.7px', marginTop: 3 }}>{label}</div>
    </div>
  )
}

function OKRCard({ okr, t, onClick }) {
  const pct = okrPct(okr)
  const status = autoStatus(pct)
  const ss = statusStyle(status)

  const kc = { OT: 0, AR: 0, BE: 0 }
  okr.krs.forEach(k => {
    const s = krStatus(k)
    s === 'On Track' ? kc.OT++ : s === 'At Risk' ? kc.AR++ : kc.BE++
  })

  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', borderRadius: 10, border: '1px solid #E2E6EA',
        borderLeft: `3px solid ${ss.dot}`, cursor: 'pointer',
        padding: '20px 22px', transition: 'box-shadow 0.18s, transform 0.18s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: t.p, letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0, paddingTop: 2 }}>
          OKR {okr.num}
        </span>
        <span style={{
          fontSize: 13, fontWeight: 600, color: ss.col, background: ss.bg,
          padding: '4px 12px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0,
          border: `1px solid ${ss.col}`,
        }}>
          {status}
        </span>
      </div>

      <div style={{
        fontSize: 17, fontWeight: 600, color: '#233737', lineHeight: 1.45, marginBottom: 6,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: 50,
      }}>
        {okr.title}
      </div>

      <div style={{
        fontSize: 13, color: '#6E7C84', lineHeight: 1.55, marginBottom: 14,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: 42,
      }}>
        {okr.objective}
      </div>

      <div style={{ height: 10, background: '#EDF0F2', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ height: '100%', background: t.p, width: pct + '%', borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#F5F7F9', border: '1px solid #E2E6EA', borderRadius: 8, padding: '4px 10px' }}>
          <span style={{ fontSize: 11, color: '#95A0AA', marginRight: 3 }}>{okr.krs.length} KRs</span>
          <Dot color="#257150" /><span style={{ fontSize: 11, color: '#6E7C84' }}>{kc.OT}</span>
          <Dot color="#DCB900" /><span style={{ fontSize: 11, color: '#6E7C84' }}>{kc.AR}</span>
          <Dot color="#CC3333" /><span style={{ fontSize: 11, color: '#6E7C84' }}>{kc.BE}</span>
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#233737', background: '#F5F7F9', border: '1px solid #E2E6EA', borderRadius: 8, padding: '4px 10px' }}>
          {pct}%
        </span>
      </div>
    </div>
  )
}

function Dot({ color }) {
  return <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
}
