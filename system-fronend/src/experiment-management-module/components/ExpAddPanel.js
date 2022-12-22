import React from "react";
import '../../static/style.css';
import ExpForm from "./ExpForm";
import { Utils } from "../../js-library/func-chunk";
import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { UserApiClient } from "../../user-management-module/service/UserApiClient";

export default class ExpAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            expInfo: {
                owner: '',
                time: new Date().toLocaleString(),
                name: '',
                desp: ''
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
                expInfo: Object.assign(this.state.expInfo, {ownerId: resp.data.nid})
            })
            return UserApiClient.retrieve(resp.data.nid);
        }).then(resp => {
            this.setState({
                expInfo: Object.assign(this.state.expInfo, {owner: resp.data.name})
            })
        })
    }


    render(){
        return(
            <div className="page-panel">
                <div className="page-title">创建新实验</div>
                <div className="page-info-left">
                    <ExpForm expInfo={this.state.expInfo} addMode={true}/>

                </div>
            </div>
        );
    }
}