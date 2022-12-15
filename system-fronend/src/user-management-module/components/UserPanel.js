import React from "react";
import "../../static/style.css"
import FunctionCard from "./FunctionCard";

export default class CrousePanel extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div className="home-panel">
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="高等数学"
                textContent="王XX" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="大学英语"
                textContent="李XX" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="线性代数"
                textContent="邓XX" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="面向对象编程"
                textContent="杨XX" />
                
            </div>
        );
    }
}