import * as React from 'react';
import NotificationUtils from '../../util/notification';
import TimeAgo from 'timeago-react';
import {
  Badge,
  Dropdown,
  Icon,
  Menu
  } from 'antd';
import './index.less';
const SubMenu = Menu.SubMenu;
export class NewsItem extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.like = this.like.bind(this)
    this.state ={
      isLike:false
    }
  }
  
  componentDidMount() {
    this.setState({
      isLike: this.props.data.like
    })
  }

  componentWillReceiveProps(nextProps: any) {
  }

  like() {
    console.log('like')
    this.setState({
      isLike: !this.state.isLike
    },()=>{
      if(this.state.isLike){
        NotificationUtils.notificationSuccess('收藏成功!','已将该咨询添加至我的收藏',3)  
      }else{
        NotificationUtils.notificationSuccess('取消收藏成功!','已将该咨询从我的收藏移除',3)         
      }
    })
  }

  menuSelect(key: any){
    console.log(key.key)
    if(key.key.includes('cancel')){
      NotificationUtils.notificationSuccess('去除标签成功!','已将咨询去除该标签',3) 
    }else{
      NotificationUtils.notificationSuccess('添加标签成功!','已将咨询添加新标签',3) 
    }
  }

  render () {
    const menu = (
      <Menu onClick ={this.menuSelect}>
        <SubMenu title="添加新标签 ">
          <Menu.Item key="前端集成"><span className="hadTag">前端基础</span></Menu.Item>
          <Menu.Item key="React"><span>React</span></Menu.Item>
        </SubMenu>
        <SubMenu title="去除标签 ">
          <Menu.Item key="cancel前端集成"><span>前端基础</span></Menu.Item>
          <Menu.Item key="cancelReact"><span>React</span></Menu.Item>
        </SubMenu>
      </Menu>
    );
    
    return(
      <div className="NewsItem">
        <div className="num">
          <Badge count={this.props.index} />
        </div>
        <div className="content">
          <div className="newsTitle">
             <a target="_blank" href={'http://' + this.props.data.link}>{this.props.data.title}</a>
          </div>
          <div className="source">
             (<a  target="_blank" href={'http://' + this.props.data.sourceLink}>{this.props.data.source}</a>)
          </div>
        </div>
        <div className="time">
          <TimeAgo datetime={this.props.data.createDate || "2017-10-01"} 
           locale='zh_CN' />
        </div>

        <div className="operate">
          <div className={ 'like' + ` ${this.state.isLike ? 'islike' : 'unlike'}`} onClick={this.like}>
            <Icon type="heart"></Icon>
          </div>

          <div className="addCollection">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                <Icon type="ellipsis" />
              </a>
            </Dropdown>
          </div>

        </div>
      </div>
    )
  }
}


export default NewsItem;
