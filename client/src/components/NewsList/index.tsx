import * as React from 'react';
import NewsItem from '../NesItem/index';
import { Table } from 'antd';
import { TableColumnConfig } from 'antd/lib/table/Table';
import { PaginationProps } from 'antd/lib/pagination';
import './index.less';

const pagination:PaginationProps = {
  total: 999,
  pageSize: 88,
  showSizeChanger: true,
  pageSizeOptions: ['20', '40', '88', '100'],
};
class MyTable extends Table<any>{}

const columns:TableColumnConfig<any>[] = [{
  title: '',
  dataIndex: 'item',
  key: 'item',
}]



export class NewsList extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      dataSource: []
    }
  }
  
  componentDidMount() {


  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps )
    if(nextProps.data && nextProps.data.length >= 0){
      let arr: any[] = []
      nextProps.data.map((item: any, key: any) =>{
         arr.push({
          key: key,
          item: <NewsItem myTagList={[item.tagList] } 
          
          tagList={this.props.tagList} key={key} data={item} index={key + 1}></NewsItem>
         })
      })
      pagination.total = nextProps.data.length
      this.setState({
        dataSource: arr
      })
    }

  }

  render () {
    return(
      <div id="NewsList" className={this.props.show ? 'show' : 'hide'}>
        {/* {
          this.props.data ? this.props.data.map((item: any, key: any) =>{
            return <NewsItem data={item} index={key + 1}></NewsItem>
            
          })
          : <div>Nothing</div>
        } */}
        

        {/* <Table pagination={{ pageSize: 88 }} scroll={{ y: 480 }} columns={columns} dataSource={this.state.dataSource} bordered size="middle"/> */}


        <MyTable pagination={ pagination } dataSource={this.state.dataSource} columns={columns} scroll={{ y: 480 }} bordered size='middle'>
        </MyTable>
      </div>
    )
  }
}


export default NewsList;
