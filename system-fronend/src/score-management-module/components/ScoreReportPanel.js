import React from "react";
import '../../static/style.css';
import {Table} from 'react-bootstrap';

export default class ScoreReportPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colNames: ["序号", "学生姓名", "考勤成绩", "作业成绩", "总成绩"],
            data: [
                {
                    stuName: "zhang",
                    att: 30,
                    ass: 60,
                    total: 90,
                },{
                    stuName: "zhang",
                    att: 30,
                    ass: 60,
                    total: 90,
                },{
                    stuName: "zhang",
                    att: 30,
                    ass: 60,
                    total: 90,
                },
            ]
        }

    }

    render(){
        var n_row = 0;
        return(
            <div className="page-panel">
                <div className="page-title">
                    <div>课程名称 | 学生成绩报告</div>
                    <div>学生总人数：50</div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>{
                            this.state.colNames.map((element) =>{
                                return <th>{element}</th>
                            })}</tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item)=>{
                            n_row += 1;
                            return(
                                <tr>
                                    <td>{n_row}</td>
                                    <td>{item.stuName}</td>
                                    <td>{item.att}</td>
                                    <td>{item.ass}</td>
                                    <td>{item.total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <a className="link-primary">下载报告-Excel表格</a>
            </div>
        );
    }
}