import React from 'react';
import '../../static/style.css';
import {Table, Pagination, Spinner} from 'react-bootstrap';
import CheckRow from './CheckRow';
import { UserApiClient } from '../service/UserApiClient';

export default class CheckPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            row_Max: 8,
            colNames: ["序号", "学/工号", "用户名", "邮箱", "操作"],
            data:[],
            loading: true,
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        UserApiClient.findAllUnchecked().then(resp => {
            console.log(resp.data)
            this.setState({
                data: resp.data,
                loading:false,
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    checkUser = (nid) => {
        UserApiClient.checkOne(nid).then(resp => {
            this.getData()
        }).catch(err => {
            console.log(err)
        })
    }

    uncheckUser = (nid) => {
        UserApiClient.uncheckOne(nid).then(resp => {
            this.getData()
        }).catch(err => {
            console.log(err)
        })
    }


    render(){
        var n_row = 0;
        return (
            <div className="page-panel">
                {
                    this.state.loading ? (
                        <div className='loading-icon'>
                            <Spinner animation="border" role="status" >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </div>
                    ):(
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>{
                                    this.state.colNames.map((element) =>{
                                        return <th key={element}>{element}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((item)=>{
                                    n_row += 1;
                                    return <CheckRow key={item.nid} nRow={n_row} data={item} pass={this.checkUser} cancel={this.uncheckUser}/>
                                })}
                            </tbody>
                        </Table>
                    )
                }
                
                {/* <div className="page-skipper">
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
                </div> */}
            </div>
        );
    }
}
