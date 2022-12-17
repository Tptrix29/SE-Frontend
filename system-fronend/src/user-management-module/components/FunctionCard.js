import React from "react";
import "../../static/style.css"
import { Utils } from "../../js-library/func-chunk";
import { WebPathConfig } from "../../config/web-path";



export default class FunctionCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token')
        }
    }

    toURL = () =>{
        // alert(this.state.token)
        WebPathConfig.toURL(this.props.link, {
            token: this.state.token
        })
    }

    render(){
        return(
            <div className="card func-card">
                <img src={this.props.imgSource}  className="card-img-top" alt="lib"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.textContent}</p>
                    <a href="#" className="btn btn-primary" onClick={this.toURL}>前往查看</a>
                </div>
            </div>
        );
    }
}