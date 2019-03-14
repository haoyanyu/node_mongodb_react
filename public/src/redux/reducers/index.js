import {combineReducers} from 'redux';

import * as User from './user';
import * as System from './system';

const rootReducers = combineReducers({
	...User,
	...System
})

export default rootReducers