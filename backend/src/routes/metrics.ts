// backend/src/routes/metrics.ts
import { Router } from "express"
import { query } from "../db"

interface MetricType {
  id: number
  user_id: number
  name: string
  unit?: string
  goal?: number
  created_at: string
}

interface MetricEntry {
  id: number
  metric_type_id: number
  entry_date: string
  value: number
  note?: string
  created_at: string
}

const router = Router()

// Get all metric types for a user
router.get("/types/:userId", async (req, res, next) => {
  try {
    const rows = await query<MetricType>(
      "SELECT * FROM metric_types WHERE user_id = $1",
      [req.params.userId]
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

// Create new metric type
router.post("/types", async (req, res, next) => {
  const { user_id, name, unit, goal } = req.body
  try {
    const rows = await query<MetricType>(
      `INSERT INTO metric_types (user_id, name, unit, goal)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, name, unit || null, goal ?? null]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

// Add new metric entry
router.post("/entries", async (req, res, next) => {
  const { metric_type_id, entry_date, value, note } = req.body
  try {
    const rows = await query<MetricEntry>(
      `INSERT INTO metric_entries (metric_type_id, entry_date, value, note)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [metric_type_id, entry_date, value, note]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

// Get entries for a metric type
router.get("/entries/:metricTypeId", async (req, res, next) => {
  try {
    const rows = await query<MetricEntry>(
      `SELECT * FROM metric_entries
       WHERE metric_type_id = $1
       ORDER BY entry_date DESC`,
      [req.params.metricTypeId]
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

// Delete a metric type (and cascade deletes entries)
router.delete("/types/:id", async (req, res, next) => {
  try {
    await query("DELETE FROM metric_types WHERE id = $1", [req.params.id])
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// Optional: daily average endpoint
router.get("/daily-averages/:metricTypeId", async (req, res, next) => {
  try {
    const rows = await query<{ day: string; daily_avg: number }>(
      `
      SELECT
        to_char(entry_date, 'YYYY-MM-DD') AS day,
        AVG(value)::float AS daily_avg
      FROM metric_entries
      WHERE metric_type_id = $1
      GROUP BY day
      ORDER BY day
      `,
      [req.params.metricTypeId]
    )

    const overall = rows.length
      ? rows.reduce((sum, r) => sum + r.daily_avg, 0) / rows.length
      : 0

    res.json({ days: rows, overall_avg: overall })
  } catch (err) {
    next(err)
  }
})

router.get("/daily-averages/:metricTypeId", async (req, res, next) => {
  try {
    const metricTypeId = Number(req.params.metricTypeId)
    const rows = await query<{ day: string; daily_avg: number }>(
      `
      SELECT
        to_char(entry_date, 'YYYY-MM-DD') AS day,
        AVG(value)::float     AS daily_avg
      FROM metric_entries
      WHERE metric_type_id = $1
      GROUP BY day
      ORDER BY day
      `,
      [metricTypeId]
    )

    const overall_avg =
      rows.length > 0
        ? rows.reduce((sum, r) => sum + r.daily_avg, 0) / rows.length
        : 0

    res.json({ days: rows, overall_avg })
  } catch (err) {
    next(err)
  }
})

export default router
