import React from 'react';
import "../../static/style.css"
import SearchBar from '../../user-management-module/components/SerachBar';
import { Button, Table, Pagination } from 'react-bootstrap';
import FileRow from './FileRow';

export default class ResourcePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            resultCol: ["#", "名称", "所属课程", "选择下载"],
            filesInfo:[{
                id: '1',
                filename:"hello.doc",
                ofCourse: "物理实验",
            },{
                id: '1',
                filename:"hello.doc",
                ofCourse: "物理实验",
            },{
                id: '1',
                filename:"hello.doc",
                ofCourse: "物理实验",
            },
            ],
            downloadSelections: [],
        }
    }

    changeQueryFilename = () => {

    }

    retrieve = () => {

    }

    render(){
        var n_file = 0;
        return(
            <div className="home-panel">
                <SearchBar tip="资料名" addDropdown={true} keywordBind={this.changeQueryFilename} query={this.retrieve}/>
                <div>
                    <Button variant='primary'>批量下载</Button>
                </div>
                <div className="resource-search-result">
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                {this.state.resultCol.map((element)=>{
                                    return <th>{element}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filesInfo.map((file)=>{
                                n_file += 1;
                                return <FileRow nFile={n_file} file={file}/>;
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="page-skipper">
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        );
    }
}