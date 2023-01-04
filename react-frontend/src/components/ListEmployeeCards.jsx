import React, { Component } from 'react';

class ListEmployeeCards extends Component {
    render() {
        return (
            <div>
                 <div className="card text-center shadow">
           
            <div className="overflow">
                <img src={this.props.imgsrc} alt="Image 1" className='card-img-top'/>
            </div>
            <div className="card-body text-dark">
                
                <h4 className="card-title">{this.props.title}</h4>
                <p className="card-text text-secondary">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus excepturi
                     nemo ad veritatis corporis obcaecati? Quibusdam adipisci natus maiores 
                     voluptatem.
                </p>
                <a href="" className="btn btn-outline-success"  id="">Go anywhere</a>
                <button className='btn btn-danger' onClick={() => this.props.history.push("/next")}
                                       style={{marginLeft:"10px"}}>Cancel</button>
                                      
            </div>
            
        </div>
            </div>
        );
    }
}

export default ListEmployeeCards;