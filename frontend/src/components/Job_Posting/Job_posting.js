import React, {Component, useEffect, useState } from "react";
import styles from "./Job_posting.module.css"
import { apiPost } from "../../utils/api-fetch"
import{JobCreateSuccessedPopUp} from "./Job_postingPopUp"
import { apiGet } from '../../utils/api-fetch';

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {title: "", salary: "", minYearsExperience: "", tags:[], searchBarTag: "",
        description:"",createJobSuccess:false,isLoaded:false,defaultTag:[]}
        this.defaultTags = ['Git','hahaha','hahahahaha']
        this.tagFromDB = []
        this.submit_credentials = this.submit_credentials.bind(this)
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
        this.addValueToTag = this.addValueToTag.bind(this)
    }
    reset(){
        this.setState({
            title: "",
            salary: "",
            minYearsExperience: "",
            tags:"",
            description:"",
            createJobSuccess:true
        })
    }
    handleCredentialsChange(event) {
        const type = event.target.name
        this.setState({
            [type]: event.target.value
        })
        console.log(this.state)
    }
    addValueToTag(event){
        let temp = this.state.tags.slice()
        temp.push(this.state.searchBarTag)
        this.setState({
            tags:temp,
            searchBarTag:''
        })
    }
    render(){  
        this.setTagsArray()
        if(!this.state.isLoaded){
            return <div>loading</div>
        }
        else{
            return(
                <form>
                    <h2 className={styles.h2}>
                        <p className={styles.p}> Job Creating </p>
                        <div className = {styles.jobTitleContainer}>
                            <input
                                name='title'
                                type="text"
                                value = {this.state.title}
                                className = {styles.jobTitleText}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Job Title"
                            >
                            </input>
                        </div>
                        <div className = {styles.salaryContainer}>
                            <input
                                name = 'salary'
                                type = 'number'
                                className = {styles.salaryText}
                                value = {this.state.salary}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Job Salary"
                            />
                        </div>
                        <div className = {styles.minYearofExpContainer}>
                            <input
                                name = 'minYearsExperience'
                                type = 'number'
                                className={styles.minYearofExpText}
                                value = {this.state.minYearsExperience}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Minimum Year of Experience"
                            />
                        </div>

                        <div className = {styles.tagSearchBarContainer}>
                            <input  list="brow"
                                    name = 'searchBarTag'
                                    type = 'text'
                                    value = {this.state.searchBarTag}
                                    onChange={this.handleCredentialsChange}
                                    placeholder = "Search Tag"
                                    className = {styles.tagSearchBarText}/>
                                <datalist id="brow">
                                {this.state.defaultTag.map(tags => (
                                    <option>{tags}</option>
                                ))}
                                </datalist>
                                {this.state.searchBarTag != ''?
                                <button type = 'button'
                                        className = {styles.addButton}
                                        onClick = {this.addValueToTag}
                                        >add</button>:
                                        <button className = {styles.disabledaddButton}>add</button>
                                }
                            <div className = {styles.tagStoreContainer}>
                                {
                                    this.state.tags.map(tag => (
                                        <div>{tag}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className = {styles.DescriptionContainer}>
                            <textarea required
                                type= 'text'
                                name = 'description'
                                className = {styles.DescriptionText}
                                value = {this.state.description}
                                onChange={this.handleCredentialsChange}
                                placeholder = "Job Description"
                            />
                        </div>
                        {this.state.title != "" && this.state.description !=""?
                                <button
                                type = 'button'
                                onClick = {this.submit_credentials}
                                className = {styles.createButton}>Create</button>
                                :
                                <button
                                type = 'button'
                                disabled
                                className = {styles.disabledcreateButton}>Create
                                </button>
                        }
                        <JobCreateSuccessedPopUp trigger = {this.state.createJobSuccess}
                        effect = {() => setTimeout(() => this.setState({
                            createJobSuccess: false}), 3000)}>
                        </JobCreateSuccessedPopUp>
                    </h2>
                </form>
            );
        }
    }
    //}
    async submit_credentials() {
        const payload = {
            tags:this.tags,
            title:this.state.title,
            minYearExperience:this.state.minYearsExperience,
            description:this.state.description,
            salary:this.state.salary
        }
        const response = await apiPost('/position/createPosition', payload)
        console.log(response.status)
        if(response.status == 201 || response.status == 200){
            this.setState({
                createJobSuccess: true}
            )
            this.reset()
        }
    }
    async getTags() {
        const a = await apiPost('/tag/get')
        return a
    }
    setTagsArray(){
        this.getTags().then(a => a.json()).then( a =>{
            this.setState({
                        defaultTag:a.map(x => x.name),
                        isLoaded:true
                    })
        })
        // .then(a=>{
        //     this.setState({
        //         defaultTag:a,
        //         isLoaded:true
        //     })
        // })
    }
}

export default CreateJobPosting
