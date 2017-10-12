import * as React from 'react';
import Loader from '../../components/Loader/index';
import NewsList from '../../components/NewsList/index';
import {
  AutoComplete,
  Button,
  Icon,
  Input
  } from 'antd';
import { connect } from 'react-redux';
import './index.less';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const Search = Input.Search;
export class DebugSearch extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.searchData = this.searchData.bind(this)
    this.state = {
      loading: false,
      currentDailyData:''
    }
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  searchData =(type: string, item: string) => {
    // console.log('searchTagData',item)
    let data = {
      "total":20, // 一共多少页
      "newsList":[
        {
          id:'001',
          title:'[译] Web 真相：cSS 不是真正的编程',
          enTitle:'',
          link:'http://toutiao.io//k/g8bv5e',
          source:'开发者头条',
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
          source:'开发者头条',
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
         source:'开发者头条',
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
          source:'开发者头条',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'开发者头条',
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
          source:'开发者头条',
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
         source:'开发者头条',
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
          source:'开发者头条',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'开发者头条',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'segmentfault',
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
          source:'sitepoint',
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
          source:'sitepoint',
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
    this.setState({loading:true})
    setTimeout(()=>{
      this.setState({
        loading:false,
        currentDailyData: data.newsList
      })
    },2000)
  } 

  render () {
    const dataSource = [
      {
        title: '搜索范围',
        children: [
          {
            title: '每日咨询搜索'
          },
          {
            title: '搜索引擎'
          }, {
            title: '博客搜索'
          }, {
            title: '社区搜索(Github等)'
          },
          , {
            title: '全部搜索'
          }
        ]
      }
    ]     


    const options = dataSource.map(group => (
      <OptGroup
        key={group.title}
        label={group.title}
      >
        {group.children.map(opt => (
          <Option key={opt.title+ ':'} value={opt.title}>
            {opt.title + ':'}
          </Option>
        ))}
      </OptGroup>
    ))
    
    return(
      <div id="DebugSearch">
       
        <div className="certain-wrapper">
        <AutoComplete
          dataSource={options}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Search
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
            placeholder="Search..."
            onSearch={value => {
              let searchType = value.substring(0, value.indexOf(':'))
              let newValue = value.substring(value.indexOf(':') + 1)
              console.log(searchType)
              console.log(newValue)
              this.searchData(searchType,newValue)
            }}
          />
        </AutoComplete>
      </div>
      <Loader show={this.state.loading} ></Loader>
      <NewsList show={!this.state.loading} data={this.state.currentDailyData} tagList={this.props.tagList}></NewsList>

      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  tagList: state.info.tagList
})

DebugSearch = connect(mapStateToProps)(DebugSearch)

export default DebugSearch