import * as React from 'react';
import { Icon, Button, Menu } from 'antd'
import { Link } from 'react-router-dom';
import './index.less';

export class NewsItem extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="NewsItem">
       
        <h3>NewsItem</h3>

      </div>
    )
  }
}


export default NewsItem;
