import React from 'react';
import { connect } from 'react-redux';
import G2 from '@antv/g2';

class NowChart extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			chart: null
		}
	}
	componentDidMount(){
		
	}
	componentDidUpdate(nextProps, nextState) {
		// console.log(this.state)
		if(this.state.chart) {
			this.state.chart.destroy()
		}
		this.setState({})
		if(nextProps.nowChartData.length > 0) {
			this.drawChart(nextProps.nowChartData)
		}
	}
	
	render(){
		return (
			<div>
				<div id="nowChart"></div>
			</div>
		)
	}
}

export default connect(state =>({
	
}))(NowChart)