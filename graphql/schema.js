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

const queryType = objectType('QueryRoot')
	.field('lists', todoListType)
		.arg('id', GraphQLInt)
		.resolve((root, {id}) => storage.findList(id))
	.end();

export default schemaFrom(queryType);