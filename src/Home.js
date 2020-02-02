import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RandomString from "./RandomString";
import './css/home.css';
import './css/bootstrap.css';

class Home extends React.Component {
  state = {
    signup: false,
    signin: false,
  }
  
  _signup = (data) => {
    const id = RandomString(16);
    document.cookie = "heroesUserId=" + id;
    sessionStorage.setItem(id, JSON.stringify(data));
    this._hide();
    window.location.assign(`/profile/?Name=${encodeURI(data.Name)}`);
  }

  _display = (type) => {
    this.setState({ 
      signup: type === "signup", 
      signin: type === "signin"
    });
  }

  _hide = () => {
    this.setState({ signin: false, signup: false });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#3F729B"}}>        
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home 
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mission</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="row" style={{backgroundColor:"#d5f4e6"}}>
          <div className="column col-sm-8 col-md-6 col-lg-5 mx-auto">
            <div className="py-3 px-3">
              <div className="card content col-center" style={{borderRadius:"5px"}}> 
                <div className="hero-cover"></div>
                  <div className="card-body row-center"> 
                    <img src="messi.jpg" alt="Avatar" />  
                  </div>
                  <div className="card-footer col-sm-12 col-md-12 col-lg-12">
                    <h5 className="card-title">Lionel Messi</h5>
                    <div className="description">                       
                      <small>Born:</small>
                      <small>June 24, 1987</small>          
                      <small>Height:</small>
                      <small>1.7m</small>
                      <small>Nationality:</small>
                      <small>Argentine</small>
                      <small>Club:</small>
                      <small>FC Barcelona</small> 
                      <small>Salary:</small>
                      <small>40 million EUR (2016)</small>
                      <small>Awards:</small>
                      <small>The Best FIFA Men's Player</small>
                      <small></small>
                      <small className="pl-4">(2019, 2015, 2012, 2011,2010, 2009)</small>
                      <small></small>
                      <small>Ballon d'Or</small>
                      <small></small>
                      <small className="pl-4">(2019, 2015, 2012, 2011,2010, 2009)</small>
                      <small></small>
                      <small>UEFA Best Player in Europe</small>
                      <small></small>
                      <small className="pl-4">(2015, 2011) and others...</small>
                    </div>          
                  </div>
                </div>
              </div>
            </div>
            { !this.state.signup && !this.state.signin &&
              <div className="column col-sm-8 col-md-6 col-lg-5 text-center py-5 px-3 mx-auto">
                <h1 style={{"color":"#555"}} className="my-5">
                  Do you have heroes? Post their details here.
                </h1>
                <div className="signup mt-5 pt-5">          
                  <a onClick={() => this._display("signup")} 
                    className="btn btn-primary d-flex justify-content-center d-md-table mx-auto"
                    href="#" >
                    Sign up
                  </a>
                  <p style={{"color":"#555"}}>Already a member? 
                    <a onClick={() => this._display("signin")} className="no-dec ml-2" href="#">
                      sign in
                    </a>
                  </p>
                </div>
              </div>
            }
            { 
              this.state.signup && !this.state.signin &&
              <div className="column col-sm-8 col-md-6 col-lg-5 text-center py-5 px-3 mx-auto col-center">
                <Signup hide={this._hide} signup={this._signup}/>
              </div>
            }
            { 
              !this.state.signup && this.state.signin &&
              <div className="column col-sm-8 col-md-6 col-lg-5 text-center py-5 px-3 mx-auto col-center">
                <Signin display={this._display} hide={this._hide} signin={this._hide}/>
              </div>
            }
          </div>
          <hr className="m-0" style={{backgroundColor:"#bbdefb","height":"1px"}}/>
          <div className="footer">        
            <small style={{color:"#555"}}>Submitted by:
              <a className="no-dec ml-2" style={{color:"#33b5e5"}} 
                href="https://www.linkedin.com/in/asaye-dilbo-6b3224143/">
                Asaye Dilbo
              </a>
            </small>
            
            <div style={{display: "flex", flexDirection:"column"}}>
              <small style={{color:"#555"}}>Email: 
                <a className="no-dec ml-2" style={{color:"#33b5e5"}} 
                  href="mailto:asayechemeda@yahoo.com">
                  asayechemeda@yahoo.com
                </a>
              </small>
              <small style={{color:"#555"}}>Github: 
                <a className="no-dec ml-2" style={{color:"#33b5e5"}}  
                  href="https://github.com/Asaye">
                  https://github.com/Asaye
                </a>
              </small>
            </div>
          </div>
        </div>
      );
  }
}

export default Home;
