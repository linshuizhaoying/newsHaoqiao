import * as React from 'react'
import { connect } from 'react-redux'

import { Form, Icon, Input, Button } from 'antd'

import { Link } from 'react-router-dom'

import Validator from '../../../util/validator'

import { RegInRemote } from '../../../actions'
import less from './index.less'

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
  checkUsername = (rule: any, value: any, callback: any) =>{
    if(!Validator.userCheck(value)){
      callback('用户名输入不合法!只允许字母开头，允许4-16个字符，允许字母数字下划线');
    }else{
      callback();
    }
  }

  checkPassword = (rule: any, value: any, callback: any) => {
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
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let {username, password, email} = values;
        dispatch(RegInRemote({username, password, email}))
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={less.signupWrapper}>
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
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请输入相同的密码!',
              }, {
                validator: this.checkPassword,
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
})

connect(mapStateToProps)(Reg)
const RegWrapper = Form.create()(Reg)
export default RegWrapper;