import React from "react";
import "../../static/style.css"


export default class FunctionCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="card func-card">
                <img src={this.props.imgSource}  class="card-img-top" alt="lib"/>
                <div class="card-body">
                    <h5 class="card-title">{this.props.title}</h5>
                    <p class="card-text">{this.props.textContent}</p>
                    <a href="#" class="btn btn-primary">前往查看</a>
                </div>
            </div>
        );
    }
}