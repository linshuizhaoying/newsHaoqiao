
import * as React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import { checkLocalSource } from '../../../../../../actions/admin';
import { connect } from 'react-redux';
import './index.less';


export class AdminNewsList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  componentDidMount(){
    let data = [{
      key: '001',
      title: '好巧前端',
      url: 'http://haoqiao.me',
      lang: 'cn',
      type: 'spider'
    },{
      key: '002',
      title: '好巧前端',
      url: 'http://haoqiao.me',
      lang: 'cn',
      type: 'spider'
    },{
      key: '003',
      title: '好巧前端',
      url: 'http://haoqiao.me',
      lang: 'en',
      type: 'spider'
    },{
      key: '004',
      title: '好巧前端',
      url: 'http://haoqiao.me',
      lang: 'en',
      type: 'spider'
    }
  ]
  this.setState({
    dataSource: data
  })
  }

  onChangeStatus = (key: any) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => {
        return item.key !== key
      })
    });
  }
  handleAdd = () => {
    const { history } = this.props;
    history.push('/xyt/newsTool/empty')
  }

  checkSource = (key: string, url: string, title: string, lang:string, type:string,code:string ) =>{
    const { dispatch, history } = this.props;
    const info ={
      currentId: key,
      currentLink: url,
      currentTitle: title,
      currentLang:  lang,
      currentType: type,
      currentCode: code,
    }
    dispatch(checkLocalSource(info))
    history.push({ pathname: '/xyt/newsTool'});
  }



  render() {
    const { dataSource } = this.state;
    const columns = 
    [{
      title: '名称',
      dataIndex: 'title',
      width: '30%',
     }, {
      title: 'Url',
      dataIndex: 'url',
     },{
      title: '语言类型',
      dataIndex: 'lang',
     },{
      title: '类型',
      dataIndex: 'type',
     },{
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        return (
          this.state.dataSource.length > 0 ?
          (
            <div>
                <Button type="primary" onClick={()=>{this.checkSource(record.key,encodeURIComponent(record.url),record.title,record.lang,record.type,record.code)}}>
                  验证
                </Button>
    
              <Popconfirm title="确定要删除么?" onConfirm={() => this.onChangeStatus(record.key)}>
                <Button type="danger">删除</Button>
              </Popconfirm>
            </div>
          ) : null
        );
      },
    }];
    return (
      <div id="AdminNewsList">
        <Button className="editable-add-btn" onClick={this.handleAdd}>新增源</Button>
        <Table  size="small" bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentSourceData: state.admin.currentSourceData,

})

AdminNewsList = connect(mapStateToProps)(AdminNewsList);

export default AdminNewsList;
