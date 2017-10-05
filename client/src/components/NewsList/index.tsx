import * as React from 'react';
import NewsItem from '../NesItem/index';
import { Table, Icon, Menu, Switch } from 'antd';
import './index.less';

const columns = [{
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
    if(nextProps.data && nextProps.data.length > 0){
      let arr: any[] = []
      nextProps.data.map((item: any, key: any) =>{
         arr.push({
          key: key,
          item: <NewsItem myTagList={item.tagList} tagList={this.props.tagList} key={key} data={item} index={key + 1}></NewsItem>
         })
      })
      this.setState({
        dataSource: arr
      },()=>{
        console.log(this.state.dataSource)
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
        
        <Table columns={columns} dataSource={this.state.dataSource} bordered
         size="middle"/>

      </div>
    )
  }
}


export default NewsList;
