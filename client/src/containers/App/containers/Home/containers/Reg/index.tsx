import * as React from 'react';
import { connect } from 'react-redux'

import  Button  from 'antd/lib/button';
import  Form  from 'antd/lib/form';
import  Icon  from 'antd/lib/icon';
import  Input  from 'antd/lib/input';
import { Link } from 'react-router-dom'

import NotificationUtils from '../../../../../../util/notification';

import Validator from '../../../../../../util/validator'

import { RegInRemote } from '../../../../../../actions'

import { setToken } from '../../../../../../util/store';

import './index.less';

const FormItem = Form.Item
class Reg extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
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
      NotificationUtils.notificationSuccess("注册成功!", nextProps.msg, 2);
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

  checkConfirm = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不同，请重新确认!');
    } else {
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
  regMe() {
    const { dispatch } = this.props;
    // console.log(RegInRemote)
    dispatch(RegInRemote(this.state))
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let {username, password, email} = values;
        const { dispatch } = this.props;
        dispatch(RegInRemote({username, password, email}))
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
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '邮箱格式非法!',
              }, {
                required: true, message: '请输入你的邮箱!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ fontSize: 13 }}/>}   placeholder="邮箱"/>
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
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请输入相同的密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="再次输入密码"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" className="signup-form-button">
              <Link to={{
                pathname: '/login',
                state: {}
              }}>去登录</Link>
            </Button>
            <Button type="danger" htmlType="submit" className="signup-form-button">
              注册
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
})
const RegForm = Form.create()(Reg);

export default connect(mapStateToProps)(RegForm);

