import * as React from 'react'
// import * as Redux from 'react-redux'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { RouteComponentProps } from 'react-router'
import {
  RegInRemote
} from '../../../actions'
import styles from './index.less'

// interface IState {
//   username: string,
//   password: string,
//   email: string
// }
// interface IRegProps {
//   user: IRegData
//   RegInRemote: typeof RegInRemote
// }

class Reg extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }
  handleChange(e: any, value: any) {
    this.setState({
      [value]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }
  regMe() {
    const { dispatch } = this.props;
    // console.log(RegInRemote)
    dispatch(RegInRemote(this.state))
  }
  render() {
    return(
      <div>
        <input
          value={ this.state.username }
          className={ styles.input }
          placeholder="用户名"
          onChange={ e => this.handleChange(e, 'username') }
        />
        <input
          value={ this.state.password }
          className={ styles.input }
          placeholder="密码"
          onChange={ e => this.handleChange(e, 'password') }
        />
        <input
          value={ this.state.email }
          className={ styles.input }
          placeholder="邮箱"
          onChange={ e => this.handleChange(e, 'email') }
        />
        <button className={styles.btn} onClick={ () => this.regMe() }> 注册</button>

        <button className={styles.return}> 返回</button>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userId: state.user.userId,
})

export default connect(mapStateToProps)(Reg)
