import React from 'react';

class Error extends React.Component {
	state = {
		countdown: 10,
	}

	componentDidMount() {
		var timer = setInterval(()=>{
			if (this.state.countdown > 1){
				this.setState((prevState) => {
					return {
						countdown: prevState.countdown - 1
					}
				});
			} else {
				clearInterval(timer);
				window.location.assign("/");
			}
		}, 1000);		
	}

	render() {
		return (
			<div className="error-page">
				<div className="col-sm-12 col-md-12 col-lg-12 h-100">
					<div className="col-center h-100">
					  <h1 style = {{fontSize: "10em"}}>
					  	{this.props.status}
					  </h1>
					  <h1>{this.props.message}</h1>
						<div>
						  {
						  	`You will be redirected to home page in 
								${this.state.countdown} seconds.`
						  }
					  </div>					
				  </div>	
			  </div>
			</div>
		);
	}
}

export default Error;


