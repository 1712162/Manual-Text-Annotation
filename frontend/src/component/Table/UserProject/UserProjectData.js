import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import dateFormat from '../../../utils/dateFormat'
import {
    ButtonGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Card,
    CardBody
} from 'reactstrap'
import { list, listUser, removeUser } from '../../../functions/project.function';
import { throwStatement } from '@babel/types';
class UserProjectData extends Component{
    constructor(props){
            super(props)
            this.state={
                users : this.props.users,
            }
    }
   
    componentDidUpdate(oldProps){
        const props =this.props
            if(oldProps.users != props.users )
            this.setState({
                users : props.users
               
            })
     
    }
    onDisplayUser(){
        if(this.state.users.length==0) return <p>(No user)</p>
        return this.state.users.map((user,i)=><div className="mr-auto">{i!=0?',':''}{user.username}</div>)
    }
   
    render(){
        return(
            <tr>
                <td>{this.props.data.project_name}</td>
                <td>{this.props.data.project_description}</td>
                <td>{this.onDisplayUser()}</td>
                <td>{dateFormat(this.props.data.created_at) }</td>
                <td>{dateFormat(this.props.data.updated_at) }</td>
                <td>
                    <Link to={`/document/${this.props.data.id}`}> 
                         <Button className="btn-success">Go to project</Button>
                    </Link>
                </td>
            </tr>
        )
    }
}
export default UserProjectData