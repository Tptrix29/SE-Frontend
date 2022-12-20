import React from "react";
import ExpItem from "../../experiment-management-module/components/ExpItem";
import AddTrigger from "../../experiment-management-module/components/AddTrigger";
import { Utils } from "../../js-library/func-chunk";
import { ExpApiClient } from "../../experiment-management-module/service/ExpApiClient";
import { WebPathConfig } from "../../config/web-path";


export default class ExpSubPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            role: '',
            isAccessToAdd: (props.role == 'CHARGING_TEACHER' || props.role == 'TEACHER') ? true: false,
            // JSON: name, time
            expData: [],
        }
    }

    componentDidMount(){
        this.getExpData()
    }

    getExpData = () => {
        ExpApiClient.getAllExp(this.state.code).then(resp => {
            // console.log('expData: ', resp.data)
            this.setState({
                expData: resp.data,
            })
        })
    }

    toAddPage = () => {
        WebPathConfig.toURL('/course/exp/add', {
            token: this.state.token, 
            code: this.state.code
        })
    }

    render(){
        return(
            <div>
                {this.state.isAccessToAdd ? <AddTrigger trigger={this.toAddPage}/>:null}
                {
                    this.state.expData.map(exp => {
                        return <ExpItem expData={exp} key={exp.eid}/>
                    })
                }
            </div>
        );
    }
}