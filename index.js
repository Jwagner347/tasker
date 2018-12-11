const express = require('express');
const bodyParser = require('body-parser');

const routesController = require('./controllers/routes');
const tasksController = require('./controllers/tasks');

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/routes/optimized', (req, res) => {
  routesController.optimizedRoutes(req, res);
});

app.post('/tasks/new', (req, res) => {
  tasksController.create(req, res);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
