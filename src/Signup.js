import React from 'react';
import Buttons from "./Buttons";
import Questions from "./Questions";

class Signup extends React.Component {
  state = {
    "Name": "",
    "Email": "",
    "Password": "",
    "Date of birth": "",
    "Phone number": "",
    "Country": "",
    "State": "",
    "City": "",
    "Zip code": "",
    "Street": "",
    "Picture": "Choose profile picture...",
    "Answers": {},
  };

  _values = (e, param) => {
      const val = e.target.value;
      this.setState((prevState) => {
        var updated = {};
        updated[param] = val;
        return updated;
      });
  }

  _questions = (e) => {
    const val = e.target.value;
    const prev = e.target.getAttribute("number");
    var updated = this.state.Answers;    
    const keys = Object.keys(updated);
    const isAnswered = prev && keys.indexOf(prev) !== -1;
    const newQuestion = val != 0 && keys.indexOf(val) === -1;

    if (isAnswered) {
      delete updated[prev];
    }

    if(newQuestion) {
      const sibling = e.target.nextSibling;      
      updated[val] = sibling.firstChild.value;
      e.target.setAttribute("number", val);
    } else if(val != 0) {
      e.target.value = "";
    }
    
    if (isAnswered || newQuestion) {
      this.setState({ Answers: updated });
    } 
  }

  _answers = (e, val) => {
    if (val) {
      var updated = this.state.Answers;
      updated[val] = e.target.value;
      this.setState({ Answers: updated });
    }   
  }
  
  _submit = () => {
    
    this.signupForm.classList.add("was-validated");
    if (document.querySelector(":invalid") === null) {
        const data = JSON.parse(JSON.stringify(this.state));
        this.props.signup(data);
    }
    
  }
  
  _renderQuesions = (props) => {
    return (
      <div>
        {
          Questions.slice(1).map((qn, i) => {
            return (
              <div key={i}>
                <select onChange={this._questions} ref={(c) => this["question" + (i + 1)] = c} 
                  className="custom-select mb-3" required>
                  {
                    Questions.map((item, index) => {
                      return (
                        <option key={index} value={index > 0 ? index : ""}>
                          {index > 0 ? `#${index}. ` : ""}{item}
                        </option>
                      );
                    })
                  }
                </select>
                { 
                  this["question" + (i + 1)] && this["question" + (i + 1)].value > 0 && 
                  <div className="form-group">
                    <input type="text" onChange={(e) => this._answers(e, this["question" + (i + 1)].value)}  
                      className="form-control answers"
                      placeholder={`Answer to security question #${this["question" + (i + 1)].value}`} required
                    />
                  </div>
                }
                <div className="invalid-feedback">Answer all security questions</div>  
              </div>
            );
          }) 
        }
      </div>
    );
  }

  _input = (props) => {
    const param = props.param;
    var placeholder;
    if (param === "Name") {
      placeholder = "Full name";
    }
    return (
      <input type={param === "Password" ? "password" : "text"} onChange={(e) => this._values(e, param)}  
        className="form-control" placeholder={placeholder ? placeholder : param} required
      />
    );
  }

  render() {
    return (    
      <div className="my-auto mx-auto"> 
        <div style={{position:"absolute", right:"15px", top:"15px"}}>
          <a onClick={() => this.props.hide()} className="close-btn no-dec" 
            href="#">
            &#x274C;
          </a>
        </div>   
        <p className="pl-3 text-grey text-left">
          Provide your details below and become a member.
        </p>
        <div className="px-3">    
          <form className="pb-3" ref={(c) => this.signupForm = c}>
            <div className="form-group">
              <this._input param={"Name"} />              
            </div>  
            <div className="row form-group">
              <div className="col">
                <input type="text" onChange={(e) => this._values(e, "Date of birth")} 
                  onFocus={(e) => e.target.type="date"} 
                  onBlur={(e) => e.target.type="text"} className="form-control" 
                  placeholder="Date of birth" required
                />
              </div>
              <div className="col">
                <this._input param={"Phone number"}  />   
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <this._input param={"Email"} /> 
              </div>
              <div className="col">
                <this._input param={"Password"} /> 
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <this._input param={"Country"} /> 
              </div>
              <div className="col">
                <this._input param={"State"} /> 
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <this._input param={"Zip code"} /> 
              </div>
              <div className="col">
                <this._input param={"City"} /> 
              </div>
            </div>
            <div className="form-group">
              <this._input param={"Street"} /> 
            </div>
            <div className="custom-file mb-3">
              <input type="file" onChange={(e) => this._values(e, "Picture")} accept="image/*"
                className="custom-file-input" id="validatedCustomFile" required
              />
              <label className="custom-file-label" for="validatedCustomFile">
                {this.state.Picture}
              </label>
              <div className="invalid-feedback">Choose valid picture location</div>
            </div>
            <this._renderQuesions />
            <Buttons type="single" onclick={this._submit} text={"Sign up"} />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;