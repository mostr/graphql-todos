import { graphql, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { objectType, schemaFrom, listOf, notNull } from 'graphql-schema';

import storage from './storage';

const todoItemType = objectType('TodoItemType')
  .field('id', notNull(GraphQLInt), 'Task id')
  .field('title', notNull(GraphQLString), 'Task title')
  .field('completed', notNull(GraphQLBoolean), 'Task state')
  .end();

const todoListType = objectType('TodoList')
  .field('id', notNull(GraphQLInt), 'List id')
  .field('name', notNull(GraphQLString), 'List name')
  .field('items', listOf(todoItemType), 'List items')
  .end();

const todoListSummaryType = objectType('TodoListSummary')
  .field('id', notNull(GraphQLInt), 'List id')
  .field('name', notNull(GraphQLString), 'List name')
  .field('pendingCount', GraphQLInt, 'Pending items count')
  .field('completedCount', GraphQLInt, 'Completed items count')
  .end();

const queryType = objectType('QueryRoot')
  .field('lists', listOf(todoListSummaryType))
    .resolve((root) => storage.getListsSummary())
  .field('list', todoListType)
    .arg('id', GraphQLInt)
    .resolve((root, {id}) => storage.findList(id))
  .end();

const mutationType = objectType('MutationRoot')
  .field('markItemAsCompleted', todoItemType)
    .arg('listId', notNull(GraphQLInt))
    .arg('itemId', notNull(GraphQLInt))
    .resolve((root, {listId, itemId}) => storage.markItemAsCompleted(listId, itemId))
  .field('addItem', todoItemType)
    .arg('listId', notNull(GraphQLInt))
    .arg('title', notNull(GraphQLString))
    .resolve((root, {listId, title}) => storage.addItem(listId, title))
    .end();

export default schemaFrom(queryType, mutationType);