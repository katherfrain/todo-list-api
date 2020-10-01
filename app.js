const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const hostname = '127.0.0.1';
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const server = http.createServer(app);

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Build a frontend',
  },
  {
    id: 3,
    todo: '???',
  },
  {
    id: 4,
    todo: 'Profit!',
  },
];
let nextid = 5;

server.listen(port, hostname, () => {
  console.log(`The server is running at http://${hostname}:${port}/`)
})
app.get('/api/todos', (req, res) => {
  res.send('You have gotten the To-Do list!')
})
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params; 
  res.send(`You have opened a todo list, ${id}`);
})
app.post('/api/todos', (req, res) => {
  if(!req.body.id || !req.body.todo){
    res.status(422).json();
  }
  var newID = [ {
    id: req.body.id, 
    todo: req.body.todo
  }]
  todoList.push(newID);
  res.status(201).json();
})
app.put('api/todos/:id', (req, res) => {
  if(!req.body.todo){
    res.status(422).json();
  }
  const { handle } = req.params;
  newID = [{
    id: nextid++,
    todo: req.body.todo
  }]

  const newToDo = todoList.findIndex(element => {
    if(element.handle == handle){
      return true
    }
    return false
  })
  
  if(newToDo == -1){
    res.status(404).json
  }
  todoList.splice(newToDo, 1, newID);
  res.send(201).json();
})
app.delete('api/todos/:id', (req, res) => {
  const {handle} = req.params;
  const deleteThisIndex = todoList.findIndex(element => {
    if(element.handle == handle){
      return true
    }
    return false;
  })
  if(deleteThisIndex == -1){
    res.status(404).json();
  }
  todoList.splice(deleteThisIndex, 1);
  res.status(204).json();
})
// DELETE /api/todos/:id

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
