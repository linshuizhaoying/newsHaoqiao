import * as React from 'react';
import './index.less';

export class AdminWeekList extends React.Component<any, any> {
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
      <div id="AdminWeekList">
        <h1>AdminWeekList</h1>
      </div>
    )
  }
}


export default AdminWeekList;
