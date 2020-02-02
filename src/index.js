import React from 'react';
import ReactDOM from 'react-dom';
//import './home.css';
import Home from './Home';
import Error from './Error';
import User from './User';
import GoogleDrive from './GoogleDrive';

const path = window.location.pathname;
//const userId = document.cookie.heroesUserId;
var userId = document.cookie.split(';').filter((item) => {
	return item.indexOf("heroesUserId") != -1;
});
if (userId.length > 0) {
	userId = userId[0].split("=")[1];
}
const data = userId.length > 0 ? sessionStorage.getItem(userId) : undefined;

if (data) {
	//window.location.hash = "/profile/?name=" + encodeURI(data.Name);
	ReactDOM.render(<User data={JSON.parse(data)}/>, document.getElementById('root'));
} else if (path.indexOf("/profile/") != -1) {
	ReactDOM.render(<Error message={"You are not logged in."} status={401}/>, document.getElementById('root'));
} else if (path === "/") {
	ReactDOM.render(<Home />, document.getElementById('root'));
} else {
	ReactDOM.render(<Error message={"Page not found."} status={404}/>, document.getElementById('root'));
}