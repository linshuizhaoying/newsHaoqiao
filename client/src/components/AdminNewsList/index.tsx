
import * as React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
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
              <Link to={{
                  pathname: '/xyt/newsTool/' +  encodeURIComponent(record.url),
                }}>
                <Button type="primary">
                  验证
                </Button>
              </Link>
    
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


export default AdminNewsList;
