const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
} 

exports.changeStatus = (req, res) => {
  Task.changeStatus(req.body.id).then((id) => {
    console.log('Task status changed');
    res.redirect('/');
  });
} 

exports.showAll = (req, res) => {
  Task.all().then((data) => {
    console.log('Data', data);
    res.send(data);
  });
} 

exports.deleteTask = (req, res) => {
  Task.delete(req.body.id).then((id) => {
    console.log('Task deleted');
    res.redirect('/');
  });
} 
