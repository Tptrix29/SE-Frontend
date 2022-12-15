import React from "react";
import '../../static/style.css';
import ExpForm from "./ExpForm";

export default class ExpAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expInfo: {
                id: 1, 
                filename: "test",
                time: "none",
            }
        }
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-title">创建新实验</div>
                <div className="page-info-left">
                    <ExpForm expInfo={this.state.expInfo}/>

                </div>
            </div>
        );
    }
}