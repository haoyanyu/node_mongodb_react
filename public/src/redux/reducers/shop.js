export const curOrderDetail = (state = {}, action) => {
	switch(action.type) {
		case 'UPDATE_ORDER_DETAIL':
			return Object.assign({}, state, action.info)
			break;
		default:
			return state
	}
}

let initDishesData = [];

export const dishesData = (state = initDishesData, action) => {
	switch(action.type) {
		case 'SET_DISHES_DATA':
			initDishesData = [...action.info]
			return [...state, ...action.info]
			break;
		case 'ADD_DISHES_CHOICE':
			initDishesData[action.info.parentIndex].children[action.info.index].count ++
			state = [...initDishesData]
			return state
			break;
		case 'DELETE_DISHES_CHOICE':
			initDishesData[action.info.parentIndex].children[action.info.index].count --
			state = [...initDishesData]
			return state
			break;
		default:
			return state
	}
}
