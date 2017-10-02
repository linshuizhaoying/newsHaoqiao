import * as React from 'react';
import NewsList from '../../components/NewsList/index';
import { Button, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

export class DailyNews extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="DailyNews">
       
        <h1>DailyNews</h1>
        <NewsList></NewsList>
      </div>
    )
  }
}


export default DailyNews;
