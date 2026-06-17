export default function Header({ theme, setTheme, t, department, fiscalYear, leader }) {
  return (
    <header
      className="no-print"
      style={{
        background: t.h,
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.30)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img
          src="/kws-logo.png"
          alt="KWS Logo"
          style={{ height: 56, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.2)' }} />
        <span
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '0.1px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            padding: '5px 14px',
          }}
        >
          OKR Tracker
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 500, lineHeight: 1.35 }}>
            {department}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, lineHeight: 1.35, marginTop: 1 }}>
            {fiscalYear} &nbsp;·&nbsp; Leader: {leader}
          </div>
        </div>

        <div className="no-print" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <ThemeDot color="#3A7391" active={theme === 'blue'} onClick={() => setTheme('blue')} title="Blue" />
          <ThemeDot color="#257150" active={theme === 'green'} onClick={() => setTheme('green')} title="Green" />
          <ThemeDot color="#CC5500" active={theme === 'orange'} onClick={() => setTheme('orange')} title="Orange" />
        </div>
      </div>
    </header>
  )
}

function ThemeDot({ color, active, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: color,
        border: active ? '2px solid rgba(255,255,255,0.88)' : '2px solid rgba(255,255,255,0.18)',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'transform 0.1s',
      }}
    />
  )
}
