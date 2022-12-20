import React from "react";
import { WebPathConfig } from "../../config/web-path";
import AddTrigger from "../../experiment-management-module/components/AddTrigger";
import { Utils } from "../../js-library/func-chunk";
import AttendanceItem from "../../score-management-module/components/AttendanceItem";
import { AttendanceApiClient } from "../../score-management-module/service/AttendanceApiCilent";

export default class AttendanceSubPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            isAccessToAdd: (props.role == 'CHARGING_TEACHER' || props.role == 'TEACHER') ? true: false,
            isAccessToEdit: props.role != 'STUDENT' ? true: false,
            attData: [],
        }
    }

    getAttData = () => {
        AttendanceApiClient.getAttendanceByCode(this.state.code).then(resp => {
            // console.log(resp.data);
            // var att = 
            this.setState({
                attData: resp.data,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        this.getAttData();
    }

    toAddPage = () => {
        WebPathConfig.toURL('/course/attendance/add', {
            token: this.state.token, 
            code: this.state.code,
        })
    }

    // 功能：展示、新建
    render(){
        // console.log(this.props.role);
        var attKey = 0;
        return(
            <div>
                {this.state.isAccessToAdd ? 
                    <AddTrigger trigger={this.toAddPage}/>:null
                }
                {this.state.attData.map(att => {
                    attKey += 1;
                    return <AttendanceItem key={att.atid} manage={this.state.isAccessToEdit} data={att} nid={this.props.nid}/>;
                })}
            </div>
        );
    }
}