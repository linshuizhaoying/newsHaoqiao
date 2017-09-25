import * as React from 'react';
import { Icon, Button, Menu } from 'antd'
import { Link } from 'react-router-dom';
import './index.less';

export class Header extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      current: 'home'
    }
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="Header">
        <div className="logoContent">
          <img className="logo" src="http://haoqiao.qiniudn.com/dragonPng.png" alt="logo"/>
          <img className="title" src="http://haoqiao.qiniudn.com/newstitle2.png" alt="logo"/>
        </div>
        <div className="menuContent">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">

            <Menu.Item key="home">
              <Icon type="home" />首页
            </Menu.Item>
            <Menu.Item key="label">
              <Icon type="cloud" />标签
            </Menu.Item>
            <Menu.Item key="systemSearch">
              <Icon type="search" />知识结构搜索
            </Menu.Item>
            <Menu.Item key="debugSearch">
              <Icon type="search" />Debug搜索
            </Menu.Item>
          </Menu>
        </div>
        <div id="UserOperate">
          { this.props.isLogin === false ?
            <div className="operateBtn">
              
              <Link to={{
                      pathname: '/reg',
                      state: {}
                    }}>
                 <Button type="default">
                    <Icon type="user-add" /> 
                    注册
                  </Button>
              </Link>

              <Link to={{
                    pathname: '/login',
                    state: {}
                  }}>
                <Button type="primary">
                  <Icon type="login" />
                  登录
                </Button>
              </Link>

            </div>
            :
            <div  className="operateBtn">
              <p>{this.props.userName}</p>
              <Button type="danger" onClick={this.props.logOut}>
                <Icon type="logout" />登出
              </Button>
            </div>
        }
        


        </div>
        

      </div>
    )
  }
}


export default Header;
