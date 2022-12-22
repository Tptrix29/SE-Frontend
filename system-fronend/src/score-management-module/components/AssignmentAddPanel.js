import React from "react";
import '../../static/style.css';
import AssignmentForm from "./AssignmentForm";
import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { UserApiClient } from "../../user-management-module/service/UserApiClient";
import { Utils } from "../../js-library/func-chunk";


export default class AssignmentAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            assignmentInfo:{
                name: "",
                owner: "",
                ddl: new Date(),
                desp: "",
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
                assignmentInfo: Object.assign(this.state.assignmentInfo, {ownerId: resp.data.nid})
            })
            return UserApiClient.retrieve(resp.data.nid);
        }).then(resp => {
            this.setState({
                assignmentInfo: Object.assign(this.state.assignmentInfo, {owner: resp.data.name})
            })
        })
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-title">创建新作业</div>
                <div className="page-info-left">
                    <AssignmentForm assignmentInfo={this.state.assignmentInfo} addMode={true}/>
                </div>
            </div>
        );
    }
}