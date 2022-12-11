import React from "react";
import '../../static/style.css';
import MissionItemWithScore from "./MissionItemWithScore";
import { InputGroup, Form, Button } from "react-bootstrap";


export default class ScoreView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditable: true,
            isAttWeightEditing: false,
            isAssWeightEditing: false,
            attWeight: 0.3,
            assWeight: 0.7,
        }
    }

    toEditAtt = ()=>{
        this.setState({
            isAttWeightEditing: !this.state.isAttWeightEditing,
        });
    }

    toEditAss = ()=>{
        this.setState({
            isAssWeightEditing: !this.state.isAssWeightEditing,
        });
    }

    render(){
        const isEditable = this.state.isEditable;
        var attEditState = this.state.isAttWeightEditing;
        var assEditState = this.state.isAssWeightEditing;
        var attWeight = this.state.attWeight;
        var assWeight = this.state.assWeight;
        return(
            <div class="intro-panel">
                <div class="score-title mt-3">
                    <div>考勤任务</div>
                    <div className="weight-box">
                        {
                            isEditable ? <Button variant="warning" onClick={this.toEditAtt}>{
                                !attEditState ? "编辑":"取消编辑"
                            }</Button>:null
                        }
                        &nbsp;&nbsp;
                        得分占比：
                        {
                            !attEditState ? 
                            <span>{attWeight}</span> : <Form.Control style={{width: "20%"}} placeholder={attWeight}></Form.Control>
                        }&nbsp;&nbsp;
                        {
                            !attEditState ? 
                            null : <Button variant="success">确认</Button>
                        }
                    </div>
                </div>
                <MissionItemWithScore/>
                <MissionItemWithScore/>

                <hr/>

                <div class="score-title mt-3">
                    <div>作业任务</div>
                    <div className="weight-box">
                        {
                            isEditable ? <Button variant="warning" onClick={this.toEditAss}>{
                                !assEditState ? "编辑":"取消编辑"
                            }</Button>:null
                        }
                        &nbsp;&nbsp;
                        得分占比：
                        {
                            !assEditState ? 
                            <span>{assWeight}</span> : <Form.Control style={{width: "20%"}} placeholder={assWeight}></Form.Control>
                        }&nbsp;&nbsp;
                        {
                            !assEditState ? 
                            null : <Button variant="success">确认</Button>
                        }
                    </div>
                </div>
                <MissionItemWithScore/>
                <MissionItemWithScore/>

                <hr/>

                {isEditable ? 
                    <div>
                    <Button variant="outline-success">查看成绩报告</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="outline-primary">计算总成绩</Button>
                    </div>:
                    <div class="score-title mt-3">总成绩：90/100</div>
                }

            </div>
        );
    }
}