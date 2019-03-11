import createHistory from 'history/createHashHistory';

const  history = createHistory();

history.listen((location, action) => {
	// console.log(location)
})

export default history;