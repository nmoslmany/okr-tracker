export default function DetailView({ t, selOkr, detPct, detKrs, onBack, onAddKr }) {
  return (
    <div style={{ padding: '22px 32px 56px', maxWidth: 900, margin: '0 auto' }}>

      {/* Nav row */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: t.p, fontSize: 13, cursor: 'pointer', padding: 0, fontWeight: 500 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = 0.75)}
          onMouseLeave={e => (e.currentTarget.style.opacity = 1)}
        >
          ← All OKRs
        </button>
        <button
          onClick={() => window.print()}
          style={{ background: 'none', border: '1px solid #C8D0D6', borderRadius: 6, padding: '5px 13px', fontSize: 12, color: '#5F696E', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#5F696E'; e.currentTarget.style.color = '#233737' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8D0D6'; e.currentTarget.style.color = '#5F696E' }}
        >
          Export / Print
        </button>
      </div>

      {/* OKR header card */}
      <div style={{ background: 'white', borderRadius: 10, padding: '24px 28px', border: '1px solid #E2E6EA', borderLeft: `8px solid ${t.p}`, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: t.p, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              OKR {selOkr.num} — Objective
            </div>
            <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 600, color: '#233737', lineHeight: 1.4 }}>
              {selOkr.title}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: '#6E7C84', lineHeight: 1.65, fontStyle: 'italic' }}>
              {selOkr.objective}
            </p>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0, background: '#F5F7F9', borderRadius: 10, padding: '14px 20px', minWidth: 88 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: t.p, lineHeight: 1 }}>{detPct}%</div>
            <div style={{ fontSize: 10, color: '#95A0AA', marginTop: 5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Overall</div>
          </div>
        </div>
        <div style={{ height: 5, background: '#EDF0F2', borderRadius: 3, overflow: 'hidden', marginTop: 18 }}>
          <div style={{ height: '100%', background: t.p, width: detPct + '%', borderRadius: 3, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* KR list */}
      {detKrs.map(kr => <KRCard key={kr.id} kr={kr} t={t} />)}

      {/* Add KR */}
      <button
        className="no-print"
        onClick={onAddKr}
        style={{ width: '100%', background: 'none', border: '2px dashed #C8D0D6', borderRadius: 10, padding: 14, fontSize: 13, color: '#95A0AA', cursor: 'pointer', marginTop: 4, fontWeight: 500, transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#5F696E'; e.currentTarget.style.color = '#5F696E' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8D0D6'; e.currentTarget.style.color = '#95A0AA' }}
      >
        + Add Key Result
      </button>
    </div>
  )
}

function KRCard({ kr, t }) {
  return (
    <div style={{ background: 'white', borderRadius: 10, border: '1px solid #E2E6EA', borderLeft: `3px solid ${kr.ss.dot}`, padding: '18px 22px', marginBottom: 10 }}>

      {/* KR header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#95A0AA', letterSpacing: '0.8px', marginBottom: 4, textTransform: 'uppercase' }}>
            Key Result {kr.krNum}
          </div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#233737', lineHeight: 1.55 }}>
            {kr.text}
          </p>
        </div>
        <div className="no-print" style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <button
            onClick={kr.onEdit}
            style={{ fontSize: 11, padding: '3px 10px', borderRadius: 5, border: '1px solid #C8D0D6', background: 'none', cursor: 'pointer', color: '#5F696E' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#5F696E'; e.currentTarget.style.color = '#233737' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8D0D6'; e.currentTarget.style.color = '#5F696E' }}
          >
            Edit
          </button>
          <button
            onClick={kr.onRemove}
            title="Remove"
            style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, border: '1px solid #F0CACA', background: 'none', cursor: 'pointer', color: '#CC3333' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FCEAEA')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 5, background: '#EDF0F2', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ height: '100%', background: kr.barC, width: kr.pct + '%', borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>

      {/* View mode */}
      {!kr.isEd && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 28, rowGap: 10 }}>
            <FramedValue label="Progress">
              <span style={{ fontSize: 16, fontWeight: 700, color: '#233737', lineHeight: 1 }}>
                {kr.current}
                <span style={{ fontSize: 12, color: '#95A0AA', fontWeight: 400 }}> / {kr.target} {kr.unit}</span>
              </span>
            </FramedValue>
            <FramedValue label="Completion">
              <span style={{ fontSize: 16, fontWeight: 700, color: kr.ss.dot, lineHeight: 1 }}>{kr.pct}%</span>
            </FramedValue>
            <div style={{ padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 500, color: kr.ss.col, background: kr.ss.bg }}>
              {kr.status}
            </div>
            <div style={{ fontSize: 11, color: '#6E7C84', padding: '3px 9px', border: '1px solid #E2E6EA', borderRadius: 6, marginLeft: 'auto' }}>
              {kr.dl}
            </div>
          </div>

          {kr.hasNote && (
            <div style={{ marginTop: 10, background: '#F7F9FA', borderRadius: 6, padding: '8px 12px', borderLeft: '2px solid #E2E6EA' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#95A0AA', textTransform: 'uppercase', letterSpacing: '0.7px' }}>Note</span>
                <span style={{ fontSize: 10, color: '#B0B8BF' }}>{kr.noteTs}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6E7C84', lineHeight: 1.6, fontStyle: 'italic' }}>{kr.note}</div>
            </div>
          )}
        </div>
      )}

      {/* Edit mode */}
      {kr.isEd && (
        <div>
          <EditField label="Key Result Text" style={{ marginBottom: 12 }}>
            <input
              type="text"
              defaultValue={kr.text}
              onChange={kr.onTextChange}
              style={{ width: '100%', border: `1px solid ${t.p}`, borderRadius: 6, padding: '7px 10px', fontSize: 13, fontWeight: 500, color: '#233737', outline: 'none', background: 'white' }}
            />
          </EditField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <EditField label="Current Value">
              <input
                type="number"
                defaultValue={kr.current}
                onChange={kr.onCurrentChange}
                style={{ width: '100%', border: `1px solid ${t.p}`, borderRadius: 6, padding: '7px 10px', fontSize: 15, fontWeight: 600, color: '#233737', outline: 'none', background: 'white' }}
              />
            </EditField>
            <EditField label="Target Value">
              <input
                type="number"
                defaultValue={kr.target}
                onChange={kr.onTargetChange}
                style={{ width: '100%', border: '1px solid #C8D0D6', borderRadius: 6, padding: '7px 10px', fontSize: 15, fontWeight: 600, color: '#233737', outline: 'none', background: 'white' }}
              />
            </EditField>
          </div>

          <EditField label="Notes" style={{ marginBottom: 12 }}>
            <textarea
              defaultValue={kr.note}
              onChange={kr.onNoteChange}
              rows={2}
              style={{ width: '100%', border: '1px solid #C8D0D6', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#233737', outline: 'none', resize: 'none', lineHeight: 1.55, background: 'white' }}
            />
          </EditField>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#95A0AA', fontWeight: 600, marginRight: 2 }}>Override Status:</span>
            <StatusBtn label="Auto"     style={kr.auto} onClick={kr.onSetAuto} />
            <StatusBtn label="On Track" style={kr.stOT} onClick={kr.onSetOT} />
            <StatusBtn label="At Risk"  style={kr.stAR} onClick={kr.onSetAR} />
            <StatusBtn label="Behind"   style={kr.stBE} onClick={kr.onSetBE} />
            <button
              onClick={kr.onStopEdit}
              style={{ marginLeft: 'auto', fontSize: 11, padding: '5px 14px', borderRadius: 6, border: 'none', background: t.p, color: 'white', cursor: 'pointer', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = 0.88)}
              onMouseLeave={e => (e.currentTarget.style.opacity = 1)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FramedValue({ label, children }) {
  return (
    <div style={{ background: '#F5F7F9', border: '1px solid #E2E6EA', borderRadius: 8, padding: '8px 14px' }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#95A0AA', fontWeight: 600, marginBottom: 3 }}>{label}</div>
      {children}
    </div>
  )
}

function EditField({ label, children, style }) {
  return (
    <div style={style}>
      <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#95A0AA', fontWeight: 600, display: 'block', marginBottom: 5 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function StatusBtn({ label, style: s, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer', fontWeight: 500, background: s.bg, color: s.col, border: `1px solid ${s.brd}` }}
    >
      {label}
    </button>
  )
}
