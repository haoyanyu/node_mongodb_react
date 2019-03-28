// 初始激活的tab 名
const initActivedTab = 'index';
const initNowChartData = [];

export const activedTab = (state = initActivedTab, action) => {
	
	switch(action.type) {
		case 'UPDATE_TAB':
			if(action.tab_name) {
				return action.tab_name
			}
			return state
		default:
			return state
	}
}

export const nowChartData = (state = initNowChartData, action) => {
	switch(action.type) {
		case 'UPDATE_NOW_CHART':
			return [...state, ...action.data]
		default:
		return state
	}
}

