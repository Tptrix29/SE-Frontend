import React from "react";
import '../../static/style.css';
import CourseForm from "./CourseForm";
import { TokenApiClient } from "../service/TokenApiClient";
import { UserApiClient } from "../service/UserApiClient";
import { Utils } from "../../js-library/func-chunk";


export default class CourseAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            courseInfo:{
                name: "",
                startTime: new Date(),
                endTime:new Date(),
                assignmentPer:"",
                attendancePer:"",
            }
        }
    }

    componentDidMount(){
        this.getOwner();
    }

    getOwner = () => {
        TokenApiClient.verify(this.state.token).catch(err => {
            console.log(err);
        }).then(resp => {
            this.setState({
                courseInfo: Object.assign(this.state.courseInfo, {ownerId: resp.data.nid})
            })
            return UserApiClient.retrieve(resp.data.nid);
        }).then(resp => {
            this.setState({
                courseInfo: Object.assign(this.state.courseInfo, {owner: resp.data.name})
            })
        })
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-title">课程添加</div>
                <div className="page-info-left">
                    <CourseForm courseInfo={this.state.courseInfo} addMode={true}/>
                </div>
            </div>
        );
    }
}