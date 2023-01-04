import './App.css';
import { BrowserRouter as Router ,Route,Switch } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import EditEmployee from './components/EditEmployee';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import ListEmployeeCards from './components/ListEmployeeCards';



function App() {
  return (
    <div>
      <Router>
            <HeaderComponent/>
               <div className="container"> 
                <Switch>
                  <Route path='/' exact component={ListEmployeeCards}/>
                  <Route path="/employees"exact  component={ListEmployeeComponent}/>
                  {/**Step 1 */}
                  <Route path="/add-employee/:id" component={CreateEmployeeComponent}/>
                  {/**Employee id is always +ve then -1 for create**<Route path="/update-employee/:id" component={UpdateEmployeeComponent}/>/** */}
                  <Route path="/view-employee/:id" component={ViewEmployeeComponent}/>
                 </Switch>
               </div>
               <FooterComponent/>
      </Router>
    </div>
  );
}


export default App;
