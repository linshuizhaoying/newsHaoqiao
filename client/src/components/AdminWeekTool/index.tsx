import * as React from 'react';
import './index.less';

export class AdminWeekTool extends React.Component<any, any> {
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
      <div id="AdminWeekTool">
        <h1>AdminWeekTool</h1>
      </div>
    )
  }
}


export default AdminWeekTool;
