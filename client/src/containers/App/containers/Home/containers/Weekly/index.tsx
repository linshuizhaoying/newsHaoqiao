import * as React from 'react';
import { Button, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

export class Weekly extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="Weekly">
       
        <h1>Weekly</h1>
      </div>
    )
  }
}


export default Weekly;
