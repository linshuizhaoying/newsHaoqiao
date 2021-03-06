import * as React from 'react';
import './index.less';
import  Button  from 'antd/lib/button';
import  Table  from 'antd/lib/table';
import { connect } from 'react-redux';
import NotificationUtils from '../../../../../../util/notification';
import { checkLocalSource } from '../../../../../../actions/admin';

export class AdminNewsCheck extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.reject = this.reject.bind(this)
    this.checkSource = this.checkSource.bind(this)
    this.state ={
      filteredInfo: null,
      sortedInfo: null,
      allData:[]
    }
  }
  
  componentDidMount() {
    const data = [{
      key: '1',
      name: 'John Brown',
      date: '2017-10-07  23:01:33',
      source: 'http://www.baidu.com',
      desc:'个人感觉不错的一个前端站点，每天更新，希望加入到订阅中'
     }, {
      key: '2',
      name: 'Jim Green',
      date: '2017-10-06  23:01:22',
      source: 'http://haoqiao.me',
      desc:'个人感觉不错的一个前端站点，每天更新，希望加入到订阅中，个人感觉不错的一个前端站点，每天更新，希望加入到订阅中，个人感觉不错的一个前端站点，每天更新，希望加入到订阅中'
     }, {
      key: '3',
      name: 'Joe Black',
      date: '2017-11-07  23:01:33',
      source: 'http://www.baidu.com',
      desc:'个人感觉不错的一个前端站点，每天更新，希望加入到订阅中'
     }, {
      key: '4',
      name: '23333',
      date: '2017-10-12  23:01:33',
      source: 'http://baidu.com',
      desc:'个人感觉不错的一个前端站点，每天更新，希望加入到订阅中'
    }];
    this.setState({
      allData:data
    })
  }

  componentWillReceiveProps(nextProps: any) {
  }

  handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  
  reject(id: any){
    let temp
    let arr = [...this.state.allData]
    console.log(arr)
    temp = arr.filter((item: any) => {return item.key !== id})
    console.log(temp)
    this.setState({
      allData: temp
    },()=>{
      NotificationUtils.notificationSuccess('拒绝成功!','已经回绝',1)
    })
  }

  checkSource = (url: string) =>{
    const { dispatch, history } = this.props;
    const info ={
      currentId: '',
      currentLink: url,
      currentTitle: '',
      currentLang: '',
      currentCode: '',
    }
    dispatch(checkLocalSource(info))
    history.push({ pathname: '/xyt/newsTool'});
  }

  render () {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: '发送者',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: '网站',
      dataIndex: 'source',
      key: 'source',
      sorter: (a: any, b: any) => a.source.length - b.source.length,
      sortOrder: sortedInfo.columnKey === 'source' && sortedInfo.order,
    },{
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      sorter: (a: any, b: any) => a.desc.length - b.desc.length,
      sortOrder: sortedInfo.columnKey === 'desc' && sortedInfo.order,
      width: 150
    }, {
      title: '发送日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => {
        const da = +new Date(a.date)
        const db =  +new Date(b.date)
        return da - db
      },
      sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text :any, record:any) => {
        return (
          <div>
    
              <Button type="primary" onClick={()=>{this.checkSource(encodeURIComponent(record.source))}}>
                去验证
               </Button>
          
           <Button type="danger" onClick={()=>this.reject(record.key)}>拒绝</Button>
          
          </div>
        );
      },
    }];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.allData} onChange={this.handleChange} />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,

})


export default connect(mapStateToProps)(AdminNewsCheck);
