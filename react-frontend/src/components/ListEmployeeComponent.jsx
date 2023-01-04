import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            //initialize array
            employees:[]
        }
        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`)
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }
    deleteEmployee(id){
        //rest api call
        EmployeeService.deleteEmployee(id).then((res)=>{
            this.setState({employees:this.state.employees.filter(employee=>employee.id !=id)});
        })
    }
    //best place for to call rest api then means it written a promise
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({
                employees:res.data
            })

        });

    }
    addEmployee(){
        this.props.history.push(`/add-employee/_add`);
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                <div className='row'>
                    <button className='btn btn-primary' onClick={this.addEmployee}>
                        Add Employee
                    </button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee EmailId</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                                <tbody> 
                                    {
                                         //dynamically display table rows
                                         //when ever u want id u have to use arrow function
                                        this.state.employees.map(
                                            employee=>
                                            <tr key={employee.id}>
                                                <td>{employee.firstName}</td>
                                                <td>{employee.lastName}</td>
                                                <td>{employee.emailId}</td>
                                                <td>
                                                    <button onClick={()=>this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                    <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                    <button style={{marginLeft:"10px"}} onClick={()=>this.viewEmployee(employee.id)} className="btn btn-info">View</button>

                                                </td>

                                            </tr>
                                        )
                                    }



                                </tbody>
                            
                        
                    </table>

                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;