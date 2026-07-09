const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

// In-memory data (Mission 1 — no database yet)
let items = [{ id: 1, name: 'Sample Item' }];

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET one item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST create item
app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));