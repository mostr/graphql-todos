import {Option} from 'giftbox';

const lists = {
	1: {
		id: 1,
		name: 'work items',
		items: [
			{ id: 11, title: 'learn graphql basics', completed: false },
			{ id: 12, title: 'master more details of graphql', completed: false }
		]
	},
	2: {
		id: 2,
		name: 'house items', 
		items: [
			{ id: 21, title: 'pick up laundry', completed: false },
			{ id: 22, title: 'wash the dishes', completed: true },
			{ id: 23, title: 'go to gym', completed: false }
		]
	}
};

function signalError(msg) { throw new Error(msg) }

const storageOps = {

	findList(id) {
		return lists[id] ? lists[id] : signalError(`Could not find list ${id}`);
	},

  markItemAsCompleted(listId, itemId) {
    return Option(lists[listId]).flatMap(list => Option(list.items.find(item => item.id === itemId)))
      .map(item => {
        item.completed = true;
        return item;
      })
      .getOrElse(signalError(`Could not find todo item ${itemId} on list ${listId}`))
  }

};

export default storageOps;