import * as React from 'react';
import DebugSearch from './containers/Home/containers/DebugSearch/index';
import Header from '../../components/Header';
import Home from './containers/Home/index';
import LearningSearch from './containers/Home/containers/LearningSearch/index';
import LoginWrapper from './containers/Home/containers/Login/index';
import NotificationUtils from '../../util/notification';
import RegWrapper from './containers/Home/containers/Reg/index';
import TagCloud from './containers/Home/containers/TagCloud/index';
import { connect } from 'react-redux';
import { getToken } from '../../util/store';
import { Logout, TagListRemote, TokenRemote } from '../../actions';
import { Route, Switch } from 'react-router-dom';
import './index.less';




export class App extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.tabHandle = this.tabHandle.bind(this)
  }

  checkLogin() {
    const { history } = this.props;
     // 只要本地缓存token那就是登录状态
     if (getToken() !== null) {
      console.log('登录状态')
      const { dispatch } = this.props;
      dispatch(TokenRemote())
    } else {
      console.log('未登录状态')
      history.push('/login')
    }
  }
  
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(TagListRemote())
  }
  componentDidMount() {
    this.checkLogin()
  }
  componentWillReceiveProps(nextProps: any) {
    const { history } = this.props;
    if(nextProps.userName === 'admin'){
      history.push('/xyt')
    }
  }

  logOut() {
    const { dispatch, history } = this.props;
    dispatch(Logout())
    NotificationUtils.notificationSuccess("退出成功!", "退出成功!", 2);    
    history.push('/login')
  }

  tabHandle(type: string) {
    const { history } = this.props;
    switch(type){
      case 'home':
        history.push('/home')  
        return
      case 'tagCloud':
        history.push('/tagCloud')  
        return
      case 'learningSearch':
        history.push('/learningSearch')  
        return
      case 'debugSearch':
        history.push('/debugSearch') 
        return
      default:
        return
    }
  }

  render() {
    return (
      <div className="App">
        <Header isLogin={this.props.isLogin} userName={this.props.userName} logOut={this.logOut} tabChange={this.tabHandle}></Header>
        <div className="App-content">
          <Switch>
            <Route path="/home" component={Home}/> 
            <Route path="/reg" component={RegWrapper}/> 
            <Route path="/login" component={LoginWrapper}/> 
            <Route path="/tagCloud" component={TagCloud}/> 
            <Route path="/learningSearch" component={LearningSearch}/> 
            <Route path="/debugSearch" component={DebugSearch}/> 
          
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName,
  allTags: state.info.allTags
})

App = connect(mapStateToProps)(App);

export default App;