import * as React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

import './index.less';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    id: this.props.id,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.key;
    this.setState({ value,key });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    console.log(this.state.id)
    console.log(this.state.value)
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
      dataSource: [{
        key: '001',
        title: '前端',
        status: '活跃',
      }, {
        key: '002',
        title: 'Javascript',
        status: '停用',
      }],
      count: 2,
    };
  }
  onCellChange = (key: any, dataIndex: any) => {
    return (value: any) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
  onChangeStatus = (key: any) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.map(item => {
        if (item.key === key) {
          item.status =  item.status === '活跃'
            ? '停用'
            : '活跃'
        }
        return item
      })
    },()=>{
      console.log(key)
    });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: '003' + Math.random() * 1000,
      title: '新标签',
      status: '活跃',
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = 
    [{
      title: '标签名称',
      dataIndex: 'title',
      width: '30%',
      render: (text: any, record: any) => (
        <EditableCell
          value={text}
          id={record.key}
          onChange={this.onCellChange(record.key, 'name')}
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
            <Popconfirm title="确定要更改该标签状态么?" onConfirm={() => this.onChangeStatus(record.key)}>
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


export default AdminTag;
