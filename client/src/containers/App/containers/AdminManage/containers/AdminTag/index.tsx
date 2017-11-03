import * as React from 'react';
import NotificationUtils from '../../../../../../util/notification';
import { addTagRemote, updateTagRemote, allTagRemote } from '../../../../../../actions/admin';
import {
  Button,
  Icon,
  Input,
  Popconfirm,
  Table
  } from 'antd';
import { connect } from 'react-redux';
import './index.less';


class EditableCell extends React.Component<any, any> {
  state = {
    value: this.props.value,
    id: this.props.id,
    editable: false,
  }
  handleChange = (e: any) => {
    const value = e.target.value;
    const key = e.target.key;
    this.setState({ value,key });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
            
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export class AdminTag extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if(nextProps && nextProps.allTags && nextProps.allTags.data.length > 0){
      const arr = nextProps.allTags.data.map((item: any, index: any) =>{
        item.key = item._id
        return item
      })
      this.setState({
        dataSource: arr
      })
      console.log(nextProps)
    }
  }

  onCellChange = (key: any, dataIndex: any, status: any) => {
    return (tagTitle: any) => {
      const { dispatch } = this.props;
      const data = {
        tagTitle,
        status
      }
      dispatch(updateTagRemote(key, data))
      NotificationUtils.notificationSuccess("更改成功!", "更改成功!", 2);   
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = tagTitle;
        this.setState({ dataSource });
      }
    };
  }
  onChangeStatus = (key: any, tagTitle: string, status: string ) => {
    const dataSource = [...this.state.dataSource];
    const Tstatus = status == '活跃' ? '停用' : '活跃'
    const { dispatch } = this.props;
    const data = {
      tagTitle,
      status: Tstatus
    }
    dispatch(updateTagRemote(key, data))
    NotificationUtils.notificationSuccess("更改成功!", "更改成功!", 2); 

    this.setState({
      dataSource: dataSource.map(item => {
        if (item.key === key) {
          item.status =  item.status == '活跃' ? '停用' : '活跃'
        }
        return item
      })
    });
  }
  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch(addTagRemote({tagTitle:'新标签',status:"活跃"}))
    dispatch(allTagRemote())
  }
  render() {
    const { dataSource } = this.state;
    const columns = 
    [{
      title: '标签名称',
      dataIndex: 'tagTitle',
      width: '30%',
      render: (text: any, record: any) => (
        <EditableCell
          value={record.tagTitle}
          id={record.key}
          onChange={this.onCellChange(record.key, 'name', record.status)}
        />
      ),
     }, {
      title: '状态',
      dataIndex: 'status',
     }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        return (
          this.state.dataSource.length > 0 ?
          (
            <Popconfirm title="确定要更改该标签状态么?" onConfirm={() => this.onChangeStatus(record.key,record.tagTitle,record.status)}>
              <a href="#">更改状态</a>
            </Popconfirm>
          ) : null
        );
      },
    }];
    return (
      <div id="AdminTag">
        <Button className="editable-add-btn" onClick={this.handleAdd}>新增标签</Button>
        <Table  size="small" bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}


const mapStateToProps = (state: any) => ({
  allTags: state.admin.allTags
})


export default connect(mapStateToProps)(AdminTag);