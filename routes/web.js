const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.post('/update/:id', tasksController.changeStatus);

router.post('/delete/:id', tasksController.deleteTask);

router.get('/tasks', tasksController.showAll);

module.exports = router; 
