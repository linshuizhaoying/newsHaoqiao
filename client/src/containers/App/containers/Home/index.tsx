import * as React from 'react';
import Collection from './containers/Collection/index';
import DailyNews from './containers/DailyNews/index';
import Guidance from './containers/Guidance/index';
import Weekly from './containers/Weekly/index';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { UserInfoRemote } from '../../../../actions/user';
import './index.less';


const TabPane = Tabs.TabPane;

export class Home extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  
  componentDidMount() {
    console.log(this.props)
  }

  getUserInfo() {
    const { dispatch } = this.props;
    dispatch(UserInfoRemote())
  }
  
  handleTab = (e: any) => {
    switch(e){
      case '1':
        return this.dailyNews()
      case '2':
        return this.community()
      case '3':
        return this.weekly()
      case '4':
        return this.collection()
      default:
        return
    }
  }
  dailyNews = () => {
    console.log('dailyNews')    
  }

  community() {
    console.log('community')    
  }

  weekly() {
    console.log('weekly') 
  }

  collection() {
    console.log('collection') 
  }

  render () {
    return(
      <div id="Home">
        {/* <button onClick={this.getUserInfo}> 获取用户信息 </button> */}
        <Tabs tabPosition='left' onTabClick={this.handleTab} >
          <TabPane tab="今日资讯" key="1" >
            <DailyNews></DailyNews>
          </TabPane>
          <TabPane tab="社区导读" key="2">
            <Guidance></Guidance>
          </TabPane>

          <TabPane tab="我的周报" key="3">
            <Weekly></Weekly>
          </TabPane>
          <TabPane tab="我的收藏" key="4">
            <Collection></Collection>
          </TabPane>
        </Tabs>
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
