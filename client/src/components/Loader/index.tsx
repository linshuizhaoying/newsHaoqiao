import * as React from 'react';
import './loader.less';
import './index.less';

export class Loader extends React.Component<any, any> {
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
      <div id="Loader" className={` ${this.props.show ? 'show' : 'hide'}`}>
   
          <div className="ball-spin-fade-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
    
      </div>
    )
  }
}


export default Loader;
