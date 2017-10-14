import * as React from 'react';
import NotificationUtils from '../../../../../../util/notification';
import { checkLocalSource, removeSourceRemote } from '../../../../../../actions/admin';
import { Button, Popconfirm, Table } from 'antd';
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

  }
  componentWillReceiveProps(nextProps: any) {
    if(nextProps && nextProps.currentSourceList && nextProps.currentSourceList.data.length > 0){
      const arr = nextProps.currentSourceList.data.map((item: any, index: any) =>{
        item.key = item._id
        return item
      })
      this.setState({
        dataSource: arr
      })
      console.log(nextProps)
    }
  }

  deleteSource = (id: any) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => {
        return item._id !== id
      })
    });
    const { dispatch } = this.props;
    dispatch(removeSourceRemote(id))
    NotificationUtils.notificationSuccess('删除成功!','删除成功!',1)
  }

  handleAdd = () => {
    const { history } = this.props;
    history.push('/xyt/newsTool/empty')
  }

  checkSource = (id: string, url: string, sourceTitle: string, lang:string, type:string,code:string ) =>{
    const { dispatch, history } = this.props;
    const info ={
      currentId: id,
      currentLink: url,
      currentTitle: sourceTitle,
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
      dataIndex: 'sourceTitle',
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
                <Button type="primary" onClick={()=>{this.checkSource(record._id,encodeURIComponent(record.url),record.sourceTitle,record.lang,record.type,record.code)}}>
                  验证
                </Button>
    
              <Popconfirm title="确定要删除么?" onConfirm={() => this.deleteSource(record._id)}>
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
  currentSourceList: state.admin.currentSourceList,

})

AdminNewsList = connect(mapStateToProps)(AdminNewsList);

export default AdminNewsList;
