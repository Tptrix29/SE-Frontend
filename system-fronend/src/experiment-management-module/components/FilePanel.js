import React from "react";
import '../../static/style.css';
import FileBar from "./FileBar";

export default class FilePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditable: true,
            isAdding: true,
            defaultInfo:{
                id: -1, 
                filename: "待上传",
                time: "-"
            },
            files: [{
                id: 1,
                filename: "hello",
                time: "2022-12-12",
            },]
        }
    }

    addFile = ()=>{
        if(this.state.isAdding){
            this.setState({
                isAdding: false,
                files: [...this.state.files, this.state.defaultInfo],
            });
            
        }else{
            alert("请先上传一份文件");
        }
        
    }


    

    render(){
        var isEditable = this.state.isEditable;
        return(
            <div>
                {this.state.files.map((element)=>{
                    return(
                        <FileBar isEditable={isEditable} file={element}/>
                    );
                })}
                <a class="primary-link mt-3" onClick={this.addFile}>添加新文件...</a>
            </div>
        );
    }
}