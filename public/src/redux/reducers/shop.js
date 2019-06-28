export const curOrderDetail = (state = {}, action) => {
	switch(action.type) {
		case 'UPDATE_ORDER_DETAIL':
			return Object.assign({}, state, action.info)
			break;
		default:
			return state
	}
}