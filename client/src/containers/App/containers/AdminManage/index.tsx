import * as React from 'react';
import AdminNewsCheck from './containers/AdminNewsCheck/index';
import AdminNewsList from './containers/AdminNewsList/index';
import AdminNewsTool from './containers/AdminNewsTool';
import AdminTag from './containers/AdminTag/index';
import AdminWeekList from './containers/AdminWeekList';
import AdminWeekTool from './containers/AdminWeekTool';
import AdminSearchList from './containers/AdminSearchList';
import AdminSearchTool from './containers/AdminSearchTool';
import NotificationUtils from '../../../../util/notification';
import { connect } from 'react-redux';
import { Icon, Layout, Menu } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { Logout } from '../../../../actions';
import './index.less';
import { allSourceRemote, checkLocalSource } from '../../../../actions/admin';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

export class AdminManage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.newsList = this.newsList.bind(this)
    this.newsTool = this.newsTool.bind(this)
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
  }

  newsList () {
    const { dispatch } = this.props;
    dispatch(allSourceRemote())
  }

  newsTool () {
    console.log('newsTool')
    const info ={
      currentId: '',
      currentLink: '',
      currentTitle: '',
      currentLang:  '',
      currentType: '',
      currentCode: '',
    }
    const { dispatch } = this.props;
    dispatch(checkLocalSource({}))
  }

  logOut = (e: any) => {
    if(e.key === 'logout'){
      const { dispatch, history } = this.props;
      dispatch(Logout())
      NotificationUtils.notificationSuccess("退出成功!", "退出成功!", 2);    
      history.push('/login')
    }
  }

  render () {
    return(
      <div id="AdminManage">
        <div className="aside">
          <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className="logo">
                  <img src="http://haoqiao.qiniudn.com/dragonPng.png" alt="logo"/>
                </div>
                <Menu  mode="inline" defaultSelectedKeys={['1']}>
                 
                    <Menu.Item key="1">
                      <Link to='/xyt/tag'>
                        <Icon type="tag" />
                          <span>
                            标签管理
                          </span>
                      </Link>
                    </Menu.Item>
                
     

                  <SubMenu key="sub1" title={<span><Icon type="message" /><span>咨询源管理</span></span>}>
                    <Menu.Item key="2">
                      <Link to='/xyt/newsCheck'>
                         审核
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to='/xyt/newsList' onClick={this.newsList}>
                        列表管理
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to='/xyt/newsTool' onClick={this.newsTool}>
                        抓取辅助
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="inbox" /><span>周报源管理</span></span>}>
                    <Menu.Item key="5">
                      <Link to='/xyt/weekList'>
                        列表管理
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to='/xyt/weekTool'>
                      抓取辅助
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="search" /><span>搜索源管理</span></span>}>
                  <Menu.Item key="7">
                    <Link to='/xyt/searchList'>
                      列表管理
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to='/xyt/searchTool'>
                    抓取辅助
                    </Link>
                  </Menu.Item>
                </SubMenu>
                </Menu>
              </Sider>
            <Layout>
              <Header style={{ background: '#fff'}}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Menu
                  mode="horizontal"
                  onClick={this.logOut}
                >
                  <SubMenu title={<span><Icon type="user" />admin</span>}>
                      <Menu.Item key="logout">Log Out</Menu.Item>
                  </SubMenu>
                </Menu>
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                  <Switch>
                    <Route path="/xyt/tag" component={AdminTag}/> 
                    <Route path="/xyt/newsList" component={AdminNewsList}/> 
                    <Route path="/xyt/newsTool" component={AdminNewsTool}/> 
                    <Route path="/xyt/newsCheck" component={AdminNewsCheck}/>
                    <Route path="/xyt/weekList" component={AdminWeekList}/> 
                    <Route path="/xyt/weekTool" component={AdminWeekTool}/> 
                    <Route path="/xyt/searchList" component={AdminSearchList}/> 
                    <Route path="/xyt/searchTool" component={AdminSearchTool}/> 
                  </Switch>
              </Content>
              <Footer>Haoqiao ©2016 Created by LinShuiZhaoYing</Footer>
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName,
  tagList: state.info.tagList
})

AdminManage = connect(mapStateToProps)(AdminManage);

export default AdminManage;
