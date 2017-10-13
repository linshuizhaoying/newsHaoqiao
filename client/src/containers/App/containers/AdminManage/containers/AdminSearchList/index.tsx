import * as React from 'react';
import './index.less';

export class AdminSearchList extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state ={
      show:false
    }
  }
  
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: any) {
  }

  

  render () {

    
    return(
      <div id="AdminSearchList">
        <h1>AdminSearchList</h1>
      </div>
    )
  }
}


export default AdminSearchList;
