import * as React from 'react';
import NotificationUtils from '../../../util/notification';
import Validator from '../../../util/validator';
import {
  Button,
  Form,
  Icon,
  Input
  } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginInRemote } from '../../../actions';
import { setToken } from '../../../util/store';
import './index.less';


const FormItem = Form.Item
class Login extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    if(this.props.isLogin){
      const { history } = this.props;
      history.push({ pathname: '/home'});
    }
  }

  componentWillReceiveProps(nextProps: any) {
    // console.log(nextProps)
    if(nextProps.status === 1){
      NotificationUtils.notificationSuccess("登录成功!", nextProps.msg, 2);
      const { history } = this.props;
      // 本地缓存token
      setToken(nextProps.token)

      history.push({ pathname: '/home'});
    }

  }

  checkUsername = (rule: any, value: any, callback: any) =>{
    if(!Validator.userCheck(value)){
      callback('用户名长度为4-12位,只允许字母数字组合');
    }else{
      callback();
    }
  }

  checkPassword = (rule: any, value: any, callback: any) =>{
    if(!Validator.passCheck(value)){
      callback('密码必须6位或以上,必须有字母和数字混合');
    }else{
      callback();
    }
  }

  handleChange(e: any, value: any) {
    this.setState({
      [value]: e.target.value
    }, () => {
      // console.log(this.state)
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let {username, password} = values;
        const { dispatch } = this.props;
        dispatch(LoginInRemote({username, password}))
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="signupWrapper">
         <Form onSubmit={this.handleSubmit} className="SignUp-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入你的账户' }, {
                validator: this.checkUsername,
              }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
         
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }, {
                validator: this.checkPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
         
          <FormItem>
            <Button type="primary" className="signup-form-button" htmlType="submit">
               登录
            </Button>
            <Button type="danger" className="signup-form-button">
              <Link to={{
                pathname: '/reg',
                state: {}
              }}>去注册</Link>
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  userId: state.user.userId,
  status: state.user.status,
  msg: state.user.msg,
  token: state.user.token
})

Login = connect(mapStateToProps)(Login);
const LoginWrapper = Form.create()(Login)
export default LoginWrapper;