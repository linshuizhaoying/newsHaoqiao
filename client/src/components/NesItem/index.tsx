import * as React from 'react';
import NotificationUtils from '../../util/notification';
import _ from 'lodash'
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
    this.menuSelect = this.menuSelect.bind(this)
    this.state ={
      isLike:false,
      tagList:'',
      myTagList:''
    }
  }
  
  componentWillMount() {
    // 求差集,将原有的tag过滤出去
    let difference = 
      this.props.tagList
      .concat(this.props.myTagList)
      .filter((v: any) => !this.props.tagList.includes(v) || !this.props.myTagList.includes(v))

    this.setState({
      isLike: this.props.data.like,
      tagList: difference,
      myTagList: this.props.myTagList
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
    let newKey = key.key.replace('cancel ','')
    let [...newArr] = this.state.myTagList
    let [...myArr] = this.state.tagList
    if(key.key.includes('cancel')){
      myArr.push(newKey)
      _.remove(newArr, function(n: any) {
        return n === newKey
      });
      this.setState({
        myTagList: newArr,
        tagList: myArr
      })
      NotificationUtils.notificationSuccess('去除标签成功!','已将咨询去除该标签',3) 
    }else{
      newArr.push(newKey)
      _.remove(myArr, function(n: any) {
        return n === newKey
      });
      this.setState({
        myTagList: newArr,
        tagList: myArr
      })

      NotificationUtils.notificationSuccess('添加标签成功!','已将咨询添加新标签'+key.key,3) 
    }
  }

  render () {
    const menu = (
      <Menu onClick ={this.menuSelect}>
        <Menu.Item disabled>选择该咨询的分类标签</Menu.Item>
        <Menu.Divider />
        <SubMenu title="添加标签">
          {
            this.state.tagList.map((item :any,key :any)=>{
               return <Menu.Item type="add" key={item}><span className="hadTag">{item}</span></Menu.Item>
            })
          }
        </SubMenu>
        <SubMenu title="去除标签">
          {
            this.state.myTagList.map((item :any,key :any)=>{
               return <Menu.Item key={'cancel ' + item}><span>{item}</span></Menu.Item>
            })
          }

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

          <div className="addCollection">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                <Icon type="ellipsis" />
              </a>
            </Dropdown>
          </div>

          <div className={ 'like' + ` ${this.state.isLike ? 'islike' : 'unlike'}`} onClick={this.like}>
            <Icon type="heart"></Icon>
          </div>


        </div>
      </div>
    )
  }
}


export default NewsItem;
