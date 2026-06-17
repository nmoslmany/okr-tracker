import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { INITIAL_OKRS } from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, 'okr-tracker.sqlite'))

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS okrs (
    id INTEGER PRIMARY KEY,
    num TEXT NOT NULL,
    title TEXT NOT NULL,
    objective TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS key_results (
    id TEXT PRIMARY KEY,
    okr_id INTEGER NOT NULL REFERENCES okrs(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    target REAL NOT NULL,
    current REAL NOT NULL,
    unit TEXT NOT NULL,
    dl TEXT NOT NULL,
    dq TEXT NOT NULL,
    ms TEXT,
    note TEXT DEFAULT '',
    note_ts TEXT,
    sort_order INTEGER NOT NULL
  );
`)

const okrCount = db.prepare('SELECT COUNT(*) AS n FROM okrs').get().n
if (okrCount === 0) {
  const insertOkr = db.prepare(
    'INSERT INTO okrs (id, num, title, objective, sort_order) VALUES (@id, @num, @title, @objective, @sort_order)'
  )
  const insertKr = db.prepare(`
    INSERT INTO key_results (id, okr_id, text, target, current, unit, dl, dq, ms, note, note_ts, sort_order)
    VALUES (@id, @okr_id, @text, @target, @current, @unit, @dl, @dq, @ms, @note, @note_ts, @sort_order)
  `)

  const seed = db.transaction(() => {
    INITIAL_OKRS.forEach((okr, oi) => {
      insertOkr.run({ id: okr.id, num: okr.num, title: okr.title, objective: okr.objective, sort_order: oi })
      okr.krs.forEach((kr, ki) => {
        insertKr.run({
          id: kr.id, okr_id: okr.id, text: kr.text, target: kr.target, current: kr.current,
          unit: kr.unit, dl: kr.dl, dq: kr.dq, ms: kr.ms ?? null, note: kr.note ?? '',
          note_ts: kr.noteTs ?? null, sort_order: ki,
        })
      })
    })
  })
  seed()
}

export default db
