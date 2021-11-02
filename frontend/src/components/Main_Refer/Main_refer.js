import React, {Component} from "react";
import ReferCSS from "./main_refer.module.css"

class referal extends Component{
    constructor(props){
        super(props)
        this.state = {refereeName: "", currentEmployee:false,
        refereeEmail: "", resume:null, description: "", employeeID: 0}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        //add positionID: number from job posting
    }
    
    handleSubmit(event){
        alert('Form Submitted');
        event.preventDefault();


    }


    handleInputChange(event){
        var target = event.target;
        var value = target.value;
        var name = target.name;
        console.log(target, value, name);
        if(name = "currentEmployee"){
            if(value="yes"){
                value = true;
            }
            else{
                value = false;
            }
            

        }
        console.log(this.state);
        this.setState({
            [name]: value
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className = {ReferCSS.container}>
                    {/* <label >
                        Current Employee:
                        <select value={this.state.currentEmployee}
                        onChange={this.handleInputChange}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>

                        </select>
                    </label> */}
                    <br/>
                   
                    <label className={ReferCSS.current}>
                         Current Employee:
                        <input type="radio" name="choice" value="yes" id="choice-yes" onClick="showHideDiv()"/>
                        <label for="choice-yes">Yes  </label>
                        <input type="radio" name="choice" value="no" id="choice-no" onClick="showHideDiv()"/>
                        <label for="choice-no">No  </label>
                    </label>
                   
                    <br/>
                    <br/>
                    <label id = "employeeID">
                        <input  type="long" defaultValue={this.state.refereeName}
                        onChange={this.handleInputChange} className={ReferCSS.id}
                        placeholder={"Employee ID"}/>
                        
                    </label>
                    <br/>
                    <br/>
                    <label >
                        <input type="text" defaultValue={this.state.refereeName}
                        onChange={this.handleInputChange} className={ReferCSS.name} placeholder={"Name"} name='refereeName'/>
            
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <input type="email" defaultValue={this.state.refereeEmail}
                        onChange={this.handleChange} className={ReferCSS.email} placeholder={"Email"} name = 'refereeEmail'/>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Resume:
                        <input type="file" defaultValue={this.state.resume}
                        onChange={this.handleInputChange} className={ReferCSS.resume}
                        placeholder={"Resume"} name='resume'/>
                    </label>
                    <br/>
                    <label >
                        <br/>
                        <textarea defaultValue={this.state.description}
                        onChange={this.handleInputChange} className={ReferCSS.reason}
                        placeholder={"Reason for Referal"} name='description'/>
                    </label>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )}
        }
export default referal