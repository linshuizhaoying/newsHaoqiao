import * as React from 'react';
import './index.less';

export class Collection extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  render () {
    return(
      <div id="Collection">
       
        <h1>Collection</h1>
      </div>
    )
  }
}


export default Collection;
