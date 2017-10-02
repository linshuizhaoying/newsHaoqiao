import * as React from 'react';
import NewsItem from '../NesItem/index';
import { Button, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';


export class NewsList extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="NewsList">
       
        <h2>NewsList</h2>
        <NewsItem></NewsItem>
      </div>
    )
  }
}


export default NewsList;
