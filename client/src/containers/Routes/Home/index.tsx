import { setTimeout } from 'timers';
import * as React from 'react';

import { connect } from 'react-redux'

import { UserInfoRemote, Logout } from '../../../actions'
import { getToken } from '../../../util/store';

import NotificationUtils from '../../../util/notification';

import './index.less';

// interface IReg {
//   RegInRemote: Redux.ActionCreator<any>
// }

// type IRegProps = IReg & Dispatch<any> & RouteComponentProps<any>

export class Home extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  
  componentDidMount() {
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps: any) {
    const { history } = this.props;
    if(!nextProps.isLogin && getToken() === null){
      NotificationUtils.notificationSuccess("退出成功!", "退出成功!", 2);
      console.log('正在退出')
      history.push('/login')
    }
  }

  getUserInfo() {
    const { dispatch } = this.props;
    dispatch(UserInfoRemote())
  }
  logOut() {
    const { dispatch } = this.props;
    dispatch(Logout())
  }

  render () {
    return(
      <div>
        <button className="home"> {this.props.userName}</button>
        <button onClick={this.getUserInfo}> 获取用户信息 </button>
        <button onClick={this.logOut}>退出登录</button>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName,
})

Home = connect(mapStateToProps)(Home);

export default Home;
