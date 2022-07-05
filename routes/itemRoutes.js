const router = require('express').Router()
const db = require('../config')

// GET all items
router.get('/items', (req, res) => {
  db.query('SELECT * FROM items ORDER BY is_done', (err, items) => {
    if (err) { console.log(err) }
    res.json(items)
  })
})

// POST one item
router.post('/items', (req, res) => {
  db.query('INSERT INTO items SET ?', req.body, (err) => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// PUT one item
router.put('/items/:id', (req, res) => {
  db.query('UPDATE items SET is_done = ? WHERE id = ?', [req.body.is_done, req.params.id], (err) => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// DELETE one item
router.delete('/items/:id', (req, res) => {
  db.query('DELETE FROM items WHERE id = ?', req.params.id, (err) => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router
