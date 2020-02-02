import React from 'react';
import './css/bootstrap.css';

class myButtons extends React.Component {

	_button = (props) => {
		return (
			<a onClick={props.onclick} 
        className="btn btn-primary d-flex justify-content-center d-md-table mx-auto px-auto w-100" 
        href="#">
        	{props.text}
      </a>
    );
	}

	single = () => {
		return (
			<div className="form-group mt-3">
        <this._button onclick={this.props.onclick} text={this.props.text} />
      </div>
    );
	}

	double = () => {
		return (
			<div className="row mx-auto my-3">
        <div className="column px-2 w-50">
					<this._button onclick={this.props.onclick[0]} text={this.props.text[0]} />
				</div>
				<div className="column px-2 w-50">
					<this._button onclick={this.props.onclick[1]} text={this.props.text[1]} />
				</div>
			</div>
    );
	}

	render() {
		return (
			<div>
				{
					this.props.type === "single" &&
					<this.single />
				}
				{
					this.props.type === "double" &&
					<this.double />
				}
			</div>
		);
	}
}

export default myButtons;