import React from 'react';
import Buttons from './Buttons';
import Questions from './Questions';
import Icons from './Icons';

const GROUPS = {
  "Personal": ["Name", "Date of birth"],
  "Account": ["Phone number", "Password"],
  "Address": ["Street", "Zip code", "City", "State", "Country"],
  "Security Questions": [Questions[1], Questions[2], Questions[3]]
};

const DISPLAY_GROUPS = {
  "Name": ["Name"],
  "Date of birth": ["Date of birth"],
  "Phone number": ["Phone number"],
  "Email": ["Email"],
  "Address": ["Street", "Zip code", "City", "State", "Country"],
  "Security Questions": [Questions[1], Questions[2], Questions[3]]
};

class User extends React.Component {
  state = {
    data: this.props.data,
    content: "",
    editting: false,
  }

  _content = (param) => {
    this.setState((prevState) => {
      var details={};
      details[param] = DISPLAY_GROUPS[param];
      return {
        editting: false,
        content: <this._editables details={details} unedittable={true} />
      }
    });
  }
  
  _dropdown = () => {
    if (!this.dropDown) return;
    this.dropDown.classList.toggle("show-dropdown");
    this.dropDown.classList.toggle("hide-dropdown");
  }

  _edit = () => {
    this.setState(() => {
      return {
        editting: true
      }
    });
  }

  _setEditable = (item) => {
    this[item].forEach((input) => {
      if (input) {
        input.removeAttribute("disabled");
      }      
    });
  }

  _editItems = (e, key, index) => {
    var updated = JSON.parse(JSON.stringify(this.state.data));

    if (index) {
      updated[key][index] = e.target.value;
    } else {
      updated[key] = e.target.value;
    }  
    
    this.setState((prevState) => {
      return {
        data: updated
      };
    });
  }

  _group = (ref, key) => {
    if (this[key]) {
      this[key].push(ref);
    } else {
      this[key] = [ref];
    }
  }
  
  _save = () => {
    // save the changes to the cloud and fetch the data
    this.setState(() => {
      return {
        editting: false,
      };
    });

  }

  _cancel = () => {
    this.setState(() => {
      return {
        data: this.props.data,
        content: "",
        editting: false,
      };
    });

  }

  _logout = () => {
    var userId = document.cookie.split(';').filter((item) => {
      return item.indexOf("heroesUserId") != -1;
    });

    if (userId.length > 0) {
      userId = userId[0].split("=")[1];
      sessionStorage.removeItem(userId);
    }   

    document.cookie = "heroesUserId=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.assign("/");
  }

  _icon = (props) => {
    const icon = Icons.Name;
    return (
      <icon />
    );
  }

  _editables = (props) => {
    const data = this.state.data;
    var details = GROUPS;

    if (props.details) {
      details = props.details;
    } 

    return (
      <div>
        {
          Object.keys(details).map((group, gIndex) => {
            return (
              <div key={gIndex}>
                <div className="row-sp-bn">
                  <span style={{fontWeight: "bold"}}>
                    {group}
                  </span>
                  { 
                    props.unedittable !== true && 
                    <a href="#" onClick={() => this._setEditable(group)}>
                      Edit
                    </a>
                  }
                </div>
                <hr className="mt-0"/>
                <form className="mx-5">
                  { 
                    details[group].map((item, kIndex) => {
                      return (
                        <div key = {kIndex} className="form-group row">
                          {
                            (props.unedittable !== true || group === "Security Questions") && 
                            <label for={item} className="col-sm-2 col-form-label">
                              {item}:
                            </label> 
                          }
                          <div className="col-sm-10">
                            { 
                              group !== "Security Questions" &&
                              <input id={item} type={item === "Password"? "password" : "text"} 
                                ref={(c) => this._group(c, group)} 
                                onChange = {(e) => this._editItems(e, item)}
                                className="form-control" value={data[item]} disabled
                              />
                            }
                            { 
                              group === "Security Questions" &&
                              <input id={item} type="text" ref={(c) => this._group(c, group)}
                                onChange = {(e) => this._editItems(e, "Answers", kIndex + 1)}  
                                className="form-control" value={data.Answers[kIndex + 1]} disabled
                              />
                            }
                          </div>
                        </div>
                      );
                    })
                  } 
                </form>
              </div>
            );
          })
        }
        {
          props.unedittable !== true &&
          <Buttons type="double" onclick={[this._save, this._cancel]} 
            text={["Save changes", "Cancel"]} />
        }
      </div>
    );
  }

  _sidebar = () => {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column mt-3">
            {
              Object.keys(DISPLAY_GROUPS).map((item, index) => {
                return (
                  <li key={index} className="nav-item">
                    <a onClick={(e) => this._content(item)} className="nav-link" href="#">
                      {Icons[item]}
                      {item} 
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    return (   
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#3F729B"}}>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse pr-5">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline mr-auto my-2 my-lg-0 col-lg-6">
              <input className="form-control mr-sm-5 col-lg-8" placeholder="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
            <div className="my-2 my-lg-0 col-sp-bn" style={{color:"#fff"}}>
              <a onClick={this._dropdown} href="#">
                <img src="/user.png" alt="..." className="rounded-circle" width="50px" height="50px" />
              </a>
              <div onMouseLeave={this._dropdown} className="dropdown row-center w-100">
                <div ref = {(c) => this.dropDown = c} className="dropdown-menu hide-dropdown">
                  <a onClick={this._edit} className="dropdown-item" href="#">
                    {Icons.Edit}
                    <span className="ml-2">Edit</span>
                  </a>
                  <a className="dropdown-item disabled" href="#">
                    {Icons.Settings}
                    <span className="ml-2">Settings</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a onClick={this._logout} className="dropdown-item" href="#">
                    {Icons.Logout}
                    <span className="ml-2">Logout</span>
                  </a>
                </div>
              </div>
              <p>{this.props.data.Name}</p>
            </div>
          </div>
        </nav> 
        <div className="container-fluid">
          <div className="row">
            <this._sidebar />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 pt-3">
              <div>
                {
                  !this.state.editting && this.state.content
                }
                {
                  this.state.editting && <this._editables />
                }
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default User;