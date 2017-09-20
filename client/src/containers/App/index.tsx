import * as React from 'react';
import { Home } from '../Routes/Home'
import Reg  from '../Routes/Reg'
import { Switch, Route, Link } from 'react-router-dom';

export class App extends React.Component<any, any> {
  componentDidMount() {
    let isLogin = false;
    const { history } = this.props;
    if (isLogin) {
      history.push('/home')
    } else {
      history.push('/reg')
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Header</h2>
          <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/reg">Reg</Link></li>
        </ul>
        </div>
        <div className="App-content">
          <Switch>
            <Route path="/home" component={Home}/> 
            <Route path="/reg" component={Reg}/> 
          </Switch>
          {/* <Reg></Reg> */}
        </div>
      </div>
    );
  }
}
