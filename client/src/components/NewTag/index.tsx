import * as React from 'react';
import NotificationUtils from '../../util/notification';
import Validator from '../../util/validator'
import  Form  from 'antd/lib/form';
import  Button  from 'antd/lib/button';
import  Modal  from 'antd/lib/modal';
import  Input  from 'antd/lib/input';
import './index.less';
const { TextArea } = Input;
const FormItem = Form.Item

export class NewTag extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      visible: false,
      url: '',
      desc: ''
    }
  }
  
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: any) {
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  ok = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let {url, desc} = values;
        console.log(url)
        console.log(desc)
        // const { dispatch } = this.props;
        // dispatch(RegInRemote({username, password, email}))
      }
    });
    this.setState({
      visible: false,
      url:'',
      desc:''
    },()=>{
      this.props.form.setFieldsValue({
        url: '',
        desc: ''
      });
      NotificationUtils.notificationSuccess('发送成功!','请耐心等待',3)
    });
  }

  cancel = () => {
    this.setState({
      visible: false,
    });
  }

  checkUrl = (rule: any, value: any, callback: any) =>{
    if(!Validator.urlCheck(value)){
      callback('输入url不合法,请重新输入,记得以http开头');
    }else{
      callback();
    }
  }

  handleChange(e: any, value: any) {
    this.setState({
      [value]: e.target.value
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="newtag">
          <Button  type="dashed"  onClick={this.showModal}>提交新源</Button>
          <Modal
            title="提交新的咨询来源(通过审核后即可订阅)"
            visible={this.state.visible}
            onOk={this.ok}
            onCancel={this.cancel}
            okText="提交"
            cancelText="取消"
          >
          <Form onSubmit={this.ok} className="SignUp-form">
            <p>有任何您感兴趣的咨询站想要分享或者加入到您的订阅,都可以提交~</p>
            <br></br>
            <div className="tag-source">
              <FormItem>
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: '请输入咨询站URL' }, {
                    validator: this.checkUrl,
                  }],
                })(
                  <Input placeholder="咨询站URL,比如:http://toutiao.io"/>
                )}
              </FormItem>
            </div>
            <div className="tag-desc">
              <FormItem>
                {getFieldDecorator('desc', {
                  rules: [{ required: true, message: '简单介绍一下这个咨询站' }],
                })(
                  <TextArea rows={4} placeholder=""/>
                )}
              </FormItem>
            </div>
            </Form>
          </Modal>
      </div>
    )
  }
}

const NewTagWrapper = Form.create()(NewTag)
export default NewTagWrapper;
