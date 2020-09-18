const knex = require('../database/connection');

exports.PENDING = 'pending';
exports.DONE = 'done';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id', id)
    .first();
} 

exports.changeStatus = (id) => {
  return knex('tasks')
    .where({ id: id })
    .update({ status: exports.DONE });
}

exports.delete = (id) => {
  return knex('tasks')
    .where('id', id)
    .del();
}