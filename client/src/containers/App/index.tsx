import * as React from 'react';
import { connect } from 'react-redux'

import Home from '../Routes/Home'
import RegWrapper from '../Routes/Reg'
import LoginWrapper from '../Routes/Login'
import { Switch, Route } from 'react-router-dom';

import { getToken } from '../../util/store';
import { Logout, TokenRemote } from '../../actions'
import Header from '../../components/Header'
import './index.less';

export class App extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const { history } = this.props;
    // 只要本地缓存token那就是登录状态
    if (getToken() !== null) {
      console.log('登录状态')
      const { dispatch } = this.props;
      dispatch(TokenRemote())
      history.push('/home')

    } else {
      console.log('未登录状态')
      console.log(getToken())
      history.push('/login')
    }
  }

  logOut() {
    const { dispatch } = this.props;
    dispatch(Logout())
  }

  render() {
    return (
      <div className="App">
        <Header isLogin={this.props.isLogin} userName={this.props.userName} logOut={this.logOut}></Header>
        <div className="App-content">
          <Switch>
            <Route path="/home" component={Home}/> 
            <Route path="/reg" component={RegWrapper}/> 
            <Route path="/login" component={LoginWrapper}/> 
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName,
})

App = connect(mapStateToProps)(App);

export default App;