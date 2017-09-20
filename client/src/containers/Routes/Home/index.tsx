import * as React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect, Dispatch } from 'react-redux'
// import {
//   RegInRemote
// } from '../../../actions'
import styles from './index.less'

interface IProps {
  isLogin: string,
}

// interface IReg {
//   RegInRemote: Redux.ActionCreator<any>
// }

// type IRegProps = IReg & Dispatch<any> & RouteComponentProps<any>

export class Home extends React.Component<IProps, {}> {
  render () {
    return(
      <button className={styles.home}> Home</button>
    )
  }
}
