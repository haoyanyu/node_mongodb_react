import {combineReducers} from 'redux';

import * as User from './user';
import * as System from './system';
import * as Shop from './shop';

const rootReducers = combineReducers({
	...User,
	...System,
	...Shop
})

export default rootReducers