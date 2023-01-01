import React from "react";
import "../../static/style.css";

export default class AddTrigger extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="add-circle" onClick={this.props.trigger}>+</div>
        );
    }
}