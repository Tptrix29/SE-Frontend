import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
import { Form, InputGroup } from "react-bootstrap";

import ExpForm from "./ExpForm";

export default class ExpIntro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEditable: true,
            isEditing: false,
            expInfo:{
                owner: "xxx", 
                time: new Date().toString(),
                equipment: "烧杯",
                desp: "Esay",
                files: "hello",
            }
        }
    }

    toEdit = ()=> {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    render(){
        const editable = this.state.isEditable;
        var editingState = this.state.isEditing;
        return(
            <div class="page-panel">
                <div class="page-title">
                    <div>课程名称 | 实验名称</div>
                    { editable ?
                    <div id="manage-exp">
                        <Button variant="warning" onClick={this.toEdit}>{
                            editingState ? "取消编辑":"编辑"
                        }</Button>&nbsp;&nbsp;
                        <Button variant="danger">删除</Button>
                    </div>:null}
                </div>
                
                <div class="intro-panel">
                    
                    {
                        !editingState ? (
                            <div>
                                <div>创建者：{this.state.expInfo.owner}</div>
                                <div>上课时间：{this.state.expInfo.time}</div>
                                <div>相关器材：{this.state.expInfo.equipment}</div>
                                <div>实验描述：{this.state.expInfo.desp}</div>
                                <div>相关文件：</div>
                            </div>
                            ):(
                                <ExpForm expInfo={this.state.expInfo}/>
                            )
                    }
                    
                </div>
            </div>
        );
    }
}