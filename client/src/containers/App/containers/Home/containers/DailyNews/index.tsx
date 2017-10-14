import * as React from 'react';
import NewsList from '../../../../../../components/NewsList/index';
import NewTag from '../../../../../../components/NewTag/index';
import Loader from '../../../../../../components/Loader/index';
import { connect } from 'react-redux';

import {
  Dropdown,
  Icon,
  Menu,
  Switch
  } from 'antd';
import './index.less';

export class DailyNews extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.dropSelect = this.dropSelect.bind(this)
    this.toggleLanguage = this.toggleLanguage.bind(this)
    this.state = {
      allData: '',
      currentDailyData: '',
      tagList:'',
      currentDataTime: '过去24小时',
      currentLanguage: 'cn',
      loading: true
    }
  }

  getTagList() {
    this.setState({
      tagList: this.props.tagList
    })
  }
  
  getDailyData() {
    let data = {
      "total":20, // 一共多少页
      "newsList":[
        {
          id:'001',
          title:'[译] Web 真相：cSS 不是真正的编程',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','css'],
        },
        {
          id:'002',
          title:'typescript 源码阅读（上）',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','typescript'],
        },
        {
         id:'003',
         title:'javaScript 闭包',
         enTitle:'',
         link:'http://toutiao.io//k/g8bv5e',
         sourceTitle:'开发者头条',
         sourceLink:'toutiao.io',
         createDate:'2017-10-02', // YY-MM-DD-HH
         type:'spider',
         body:'',
         enBody:'',
         read:'1',
         like:false,
         score:'1',
         tagList:['前端','javascript'],
        },
        {
          id:'004',
          title:'ES6系列文章 Promise',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','javascript'],
         },
         {
          id:'005',
          title:'setTimeout与setInterval的区别和nodejs中的差异',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['前端','javascript'],
         },
         {
          id:'006',
          title:'2017年react面试复习资料整理',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['react'],
         },
         {
          id:'007',
          title:'vue 将echarts封装为组件一键使用',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['Vue'],
         },{
          id:'008',
          title:'[译] Web 真相：cSS 不是真正的编程',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','css'],
        },
        {
          id:'009',
          title:'typescript 源码阅读（上）',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','typescript'],
        },
        {
         id:'010',
         title:'javaScript 闭包',
         enTitle:'',
         link:'http://toutiao.io//k/g8bv5e',
         sourceTitle:'开发者头条',
         sourceLink:'toutiao.io',
         createDate:'2017-10-02', // YY-MM-DD-HH
         type:'spider',
         body:'',
         enBody:'',
         read:'1',
         like:false,
         score:'1',
         tagList:['前端','javascript'],
        },
        {
          id:'011',
          title:'ES6系列文章 Promise',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','javascript'],
         },
         {
          id:'012',
          title:'setTimeout与setInterval的区别和nodejs中的差异',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['前端','javascript'],
         },
         {
          id:'013',
          title:'2017年react面试复习资料整理',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['react'],
         },
         {
          id:'014',
          title:'vue 将echarts封装为组件一键使用',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['Vue'],
         },
         {
          id:'015',
          title:'ES6系列文章 Promise',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'开发者头条',
          sourceLink:'toutiao.io',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'1',
          like:false,
          score:'1',
          tagList:['前端','javascript'],
         },
         {
          id:'016',
          title:'setTimeout与setInterval的区别和nodejs中的差异',
          enTitle:'cSS font-variant tester',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['前端','javascript'],
         },
         {
          id:'017',
          title:'2017年react面试复习资料整理',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['react'],
         },
         {
          id:'018',
          title:'vue 将echarts封装为组件一键使用',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          sourceTitle:'segmentfault',
          sourceLink:'segmentfault.com',
          createDate:'2017-10-02', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['Vue'],
         },
         {
          id:'019',
          title:'xxxxx',
          enTitle:'cSS font-display: The Future of Font Rendering on the Web',
          link:'https://www.sitepoint.com/css-font-display-future-font-rendering-web/',
          sourceTitle:'sitepoint',
          sourceLink:'sitepoint.com',
          createDate:'2017-10-03', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['cSS'],
         },
         {
          id:'020',
          title:'xxxxx',
          enTitle:'20 principles for Craft CMS',
          link:'https://www.sitepoint.com/css-font-display-future-font-rendering-web/',
          sourceTitle:'sitepoint',
          sourceLink:'sitepoint.com',
          createDate:'2017-10-03', // YY-MM-DD-HH
          type:'spider',
          body:'',
          enBody:'',
          read:'12',
          like:true,
          score:'21',
          tagList:['cSS'],
         }
      ]
    }
    this.setState({
      allData: data,
    },()=>{
      this.changeLanguage('cn')
      setTimeout(()=>{this.setState({loading:false})},3000)
    })
  }
  /** 
   * @param {string} type 
   * @memberof DailyNews
   * 筛选逻辑是根据返回单条数据中enTitle是否存在，因为enTitle是英文咨询的标题，而且英文咨询还存在
   * 翻译后的中文咨询
  */
  changeLanguage(type: string){
    let temp
    // 浅拷贝赋值
    let { newsList } = this.state.allData
    if(type === 'cn'){
      temp = newsList
        .filter((item: any, key: any) => {
          return item.enTitle.length === 0
      })
    }else{
      temp = newsList
      .filter((item: any, key: any) => {
        return item.enTitle.length !== 0
      })
    }
    newsList = temp
    
    this.setState({
      currentDailyData: newsList,
    })
    
  }

  componentDidMount() {
    this.getTagList()
    this.getDailyData()
  }

  componentWillReceiveProps(nextProps: any) {

  }

  dropSelect = (key: any) => {
    console.log(key)
    switch(key.key){
      case '1':
        return this.setState({
          currentDataTime:'过去24小时'
        })
      case '2':
        return this.setState({
          currentDataTime:'过去一周'
        })
      case '3':
        return this.setState({
          currentDataTime:'过去一月'
        })
      default:
      return
    }
  }

  toggleLanguage() {
    if(this.state.currentLanguage === 'cn'){
      this.setState({
        currentLanguage: 'en'
      },()=>{
        this.changeLanguage('en')
        console.log('切换英文咨询')
      })
    }else{
      this.setState({
        currentLanguage: 'cn'
      },()=>{
        this.changeLanguage('cn')
        console.log('切换中文咨询')
      })
    }
  }

  render () {

    const menu = (
      <Menu onClick ={this.dropSelect}>
        <Menu.Item key="1">过去24小时</Menu.Item>
        <Menu.Item key="2">过去一周</Menu.Item>
        <Menu.Item key="3">过去一月</Menu.Item>
      </Menu>
    );
    
    return(
      <div id="DailyNews">
        <div className="dailyThead">
          <div className="dropdown">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                {this.state.currentDataTime} <Icon type="down" />
              </a>
            </Dropdown>
            <NewTag></NewTag>
          </div>
          <div className="switch">
           
            <Switch checkedChildren="切换中文咨询" unCheckedChildren="切换英文咨询" onChange={this.toggleLanguage}/>
          </div>
        </div>
        <hr></hr>


        <Loader show={this.state.loading} ></Loader>
        <NewsList show={!this.state.loading} data={this.state.currentDailyData} tagList={this.state.tagList}>
         
        </NewsList>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  tagList: state.info.tagList
})

DailyNews = connect(mapStateToProps)(DailyNews);

export default DailyNews;
