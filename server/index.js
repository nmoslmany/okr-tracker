import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

function loadOkrs() {
  const okrs = db.prepare('SELECT * FROM okrs ORDER BY sort_order').all()
  const krs = db.prepare('SELECT * FROM key_results ORDER BY sort_order').all()
  return okrs.map(o => ({
    id: o.id, num: o.num, title: o.title, objective: o.objective,
    krs: krs.filter(k => k.okr_id === o.id).map(k => ({
      id: k.id, text: k.text, target: k.target, current: k.current, unit: k.unit,
      dl: k.dl, dq: k.dq, ms: k.ms, note: k.note, noteTs: k.note_ts,
    })),
  }))
}

app.get('/api/okrs', (req, res) => {
  res.json(loadOkrs())
})

app.patch('/api/krs/:id', (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM key_results WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Key result not found' })

  const allowed = ['text', 'current', 'target', 'note', 'noteTs', 'ms']
  const patch = {}
  for (const key of allowed) {
    if (key in req.body) patch[key] = req.body[key]
  }

  const merged = {
    text: patch.text ?? existing.text,
    current: patch.current ?? existing.current,
    target: patch.target ?? existing.target,
    note: patch.note ?? existing.note,
    note_ts: patch.noteTs ?? existing.note_ts,
    ms: 'ms' in patch ? patch.ms : existing.ms,
    id,
  }

  db.prepare(
    'UPDATE key_results SET text=@text, current=@current, target=@target, note=@note, note_ts=@note_ts, ms=@ms WHERE id=@id'
  ).run(merged)

  const updated = db.prepare('SELECT * FROM key_results WHERE id = ?').get(id)
  res.json({
    id: updated.id, text: updated.text, target: updated.target, current: updated.current,
    unit: updated.unit, dl: updated.dl, dq: updated.dq, ms: updated.ms, note: updated.note, noteTs: updated.note_ts,
  })
})

app.post('/api/okrs/:okrId/krs', (req, res) => {
  const okrId = Number(req.params.okrId)
  const okr = db.prepare('SELECT * FROM okrs WHERE id = ?').get(okrId)
  if (!okr) return res.status(404).json({ error: 'OKR not found' })

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) AS m FROM key_results WHERE okr_id = ?').get(okrId).m
  const kr = {
    id: 'k' + Date.now(),
    okr_id: okrId,
    text: req.body.text || 'New Key Result',
    target: req.body.target ?? 100,
    current: req.body.current ?? 0,
    unit: req.body.unit || '%',
    dl: req.body.dl || 'Q4 FY26/27',
    dq: req.body.dq || 'Q4',
    ms: null,
    note: '',
    note_ts: null,
    sort_order: maxOrder + 1,
  }

  db.prepare(`
    INSERT INTO key_results (id, okr_id, text, target, current, unit, dl, dq, ms, note, note_ts, sort_order)
    VALUES (@id, @okr_id, @text, @target, @current, @unit, @dl, @dq, @ms, @note, @note_ts, @sort_order)
  `).run(kr)

  res.status(201).json({
    id: kr.id, text: kr.text, target: kr.target, current: kr.current, unit: kr.unit,
    dl: kr.dl, dq: kr.dq, ms: kr.ms, note: kr.note, noteTs: kr.note_ts,
  })
})

app.delete('/api/krs/:id', (req, res) => {
  const result = db.prepare('DELETE FROM key_results WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Key result not found' })
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`OKR Tracker API listening on http://localhost:${PORT}`)
})
