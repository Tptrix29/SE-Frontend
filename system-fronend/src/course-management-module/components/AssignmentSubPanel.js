import React from "react";
import AssignmentItem from '../../score-management-module/components/AssignmentItem';
import AddTrigger from "../../experiment-management-module/components/AddTrigger";
import { AssignmentApiClient } from "../../score-management-module/service/AssignmentApiClient";
import { Utils } from "../../js-library/func-chunk";
import { WebPathConfig } from '../../config/web-path';

export default class AssignmentSubPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            isAccessToAdd: (props.role == 'CHARGING_TEACHER' || props.role == 'TEACHER') ? true: false,
            isAccessToEdit: props.role != 'STUDENT' ? true: false,

            assData: [],
        }
    }

    componentDidMount(){
        this.getAssignmentInfo()
    }

    getAssignmentInfo = () => {
        AssignmentApiClient.getAssignmentByCode(this.state.code).then(resp => {
            // console.log(resp.data)
            this.setState({
                assData: resp.data,
            })
        })
    }

    toAddPage = () => {
        WebPathConfig.toURL('/course/assignment/add', {
            token:this.state.token,
            code: this.state.code,
        })
    }

    render(){
        return(
            <div>
                {this.state.isAccessToAdd ? <AddTrigger trigger={this.toAddPage}/>:null}
                {
                    this.state.assData.map(ass => {
                        return <AssignmentItem key={ass.asid} data={ass} manage={this.state.isAccessToEdit} nid={this.props.nid}/>
                    })
                }
            </div>
        );
    }
}