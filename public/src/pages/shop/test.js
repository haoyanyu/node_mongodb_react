import React from 'react';

export default class Test extends React.Component {
	state = {
		arr: [1,1,1,1,1]
	}
	
	render(){
		return (
			<div>
				<div onClick={()=>{console.log(123);this.setState({arr: [...this.state.arr, ...[1,1,1]]})}} style={{position:'fixed',zIndex:'1',top:0,width:'100%',height: '50px',background:'#383838'}}></div>
				{/* <div style={{lineHeight:3,position:'fixed',top:'50px',bottom:'50px',width:'100%',overflowY:'scroll',WebkitOverflowScrolling:'touch'}}> */}
				<div style={{lineHeight:3,height:'100vh',padding:'50px 0',overflowY:'scroll',WebkitOverflowScrolling:'touch'}}>
					<div>
						{
							this.state.arr.map(item => (
								<p>main</p>
							))
						}
					</div>
					
				</div>
				<div style={{position:'fixed',bottom:0,width:'100%',height: '50px',background:'#0D8EFE'}}></div>
			</div>
		)
	}
}