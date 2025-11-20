const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Alice', age: 22 }
];

// CREATE
app.post('/students', (req, res) => {
  const s = req.body;
  if (!s.id || !s.name || !s.age) return res.status(400).send('Missing data');
  students.push(s);
  res.send(students);
});

// READ all
app.get('/students', (req, res) => res.send(students));

// READ one
app.get('/students/:id', (req, res) => {
  const s = students.find(x => x.id == req.params.id);
  s ? res.send(s) : res.status(404).send('Not found');
});

// UPDATE
app.put('/students/:id', (req, res) => {
  const s = students.find(x => x.id == req.params.id);
  if (!s) return res.status(404).send('Not found');
  Object.assign(s, req.body);
  res.send(s);
});

// DELETE
app.delete('/students/:id', (req, res) => {
  students = students.filter(x => x.id != req.params.id);
  res.send(students);
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));