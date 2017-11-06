import * as React from 'react';
import NewsList from '../../../../../../components/NewsList/index';
import NewTag from '../../../../../../components/NewTag/index';
import Loader from '../../../../../../components/Loader/index';
import { connect } from 'react-redux';
import { newsListRemote, WeeksNewsListRemote, MouthsNewsListRemote } from '../../../../../../actions';
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
    this.getTagList = this.getTagList.bind(this)
    this.getDailyData = this.getDailyData.bind(this)
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
    console.log(this.props)
    this.setState({
      tagList: this.props.tagList
    })
  }
  
  getDailyData(daily: any) {
    console.log(daily)
    let data = {
      "total":20, // 一共多少页
      "newsList": daily
    }
    this.setState({
      allData: data,
    },()=>{
      this.changeLanguage('cn')
      setTimeout(()=>{this.setState({loading:false})},1000)
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
    console.log(this.state.allData)
    let { newsList }  = this.state.allData
    if(type === 'cn'){
      temp = newsList
        .filter((item: any, key: any) => {
          return item.enTitle === null
      })
    }else{
      temp = newsList
      .filter((item: any, key: any) => {
        return item.enTitle !== null
      })
    }
    newsList = temp
    
    this.setState({
      currentDailyData: newsList,
    })
    
  }

  componentDidMount() {
    this.getTagList()
    const { dispatch } = this.props;
    dispatch(newsListRemote())
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    if(nextProps){
      console.log('233',nextProps)
      this.getDailyData(nextProps.newsList)
    }
  }

  dropSelect = (key: any) => {
    switch(key.key){
      case '1':
        return this.setState({
          currentDataTime:'过去24小时'
        }, () => {
          const { dispatch } = this.props;
          dispatch(newsListRemote())
          this.setState({loading:true})
        })
      case '2':
        return this.setState({
          currentDataTime:'过去一周'
        }, () => {
          const { dispatch } = this.props;
          dispatch(WeeksNewsListRemote())
          this.setState({loading:true})
        })
      case '3':
        return this.setState({
          currentDataTime:'过去一月'
        }, () => {
          const { dispatch } = this.props;
          dispatch(MouthsNewsListRemote())
          this.setState({loading:true})
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
        <NewsList show={!this.state.loading} data={this.state.currentDailyData} tagList={this.props.tagList}>
         
        </NewsList>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  tagList: state.info.tagList,
  newsList: state.info.newsList
})

export default connect(mapStateToProps)(DailyNews);
