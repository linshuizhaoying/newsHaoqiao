import * as React from 'react';
import NotificationUtils from '../../../util/notification';
import { connect } from 'react-redux';
import { getToken } from '../../../util/store';
import { UserInfoRemote } from '../../../actions';
import './index.less';

export class Home extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
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


  render () {
    return(
      <div id="Home">
        <button> {this.props.userName}</button>
        <button onClick={this.getUserInfo}> 获取用户信息 </button>
 
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
