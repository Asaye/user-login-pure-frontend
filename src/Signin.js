import React from 'react';
import Buttons from './Buttons';
import sampleData from './sampleUserData.json';
import RandomString from "./RandomString";

class Signin extends React.Component {
  state = {
    Email: "",
    Password: "",
    Message: "",
  };

  _values = (e, param) => {
      const val = e.target.value;
      this.setState((prevState) => {
        var updated = {};
        updated[param] = val;
        return updated;
      });
  }
    
  _submit = () => {    
      const email = this.state.Email;
      const password = this.state.Password;
      const data = sampleData.filter((item) => {
        return item.Email === email;
      });
      
      if (data.length === 0) {
          this.loginMessage.classList.add("login-msg");
          this.setState((prevState) => {
            return {
              Message: "The email you provided is not registered."
            }
          });
      } else {
         if (data[0].Password === password) {
            const id = RandomString(16);
            document.cookie = "heroesUserId=" + id;
            sessionStorage.setItem(id, JSON.stringify(data[0]));
            this.props.hide();
            window.location.assign(`/profile/?Name=${encodeURI(data[0].Name)}`);
         } else {
            this.loginMessage.classList.add("login-msg");
            this.setState((prevState) => {
              return {
                Message: "Incorrect password."
              }
            });
         }
      }
  }
   
  render() {
    return (    
      <div className="my-auto mx-auto row"> 
        <a className="close-btn no-dec" onClick={() => this.props.hide()} href="#">
          &#x274C;
        </a>
        <div className="my-3 mx-auto column col-sm-12 col-md-12 col-lg-12">
          <p className="text-grey">
            Provide your login credentials below:
          </p>
          <form className="pb-3" ref={(c) => this.signinForm = c}>
            <div className="form-group">
              <input type="text" onChange={(e) => this._values(e, "Email")} 
                 className="form-control" placeholder="Email" required
              />
            </div>
            <div className="form-group mb-1">
              <input type="password" onChange={(e) => this._values(e, "Password")} 
                 className="form-control" placeholder="Password" required
              />
            </div>  
            <div ref = {(c) => this.loginMessage = c} className="invalid-feedback my-auto">
              {this.state.Message}
            </div>
            <Buttons type={"single"} onclick={this._submit} text={"Sign in"} />
          </form>
          <p style={{"color":"#555"}}>Not registered yet? 
            <a onClick={() => this.props.display("signup")} 
              className="ml-1 no-dec" href="#">
              sign up
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Signin;