import * as React from 'react';
import axios from 'axios';
import {
  Button,
  Icon,
  Input,
  Select
  } from 'antd';
import { UrlRegEx } from '../../../../../../util/tools';
import { connect } from 'react-redux';
import './index.less';
import { FRAME_API, ONLINETEST_API } from '../../../../../../service/api/index';
import { addSourceRemote, allSourceRemote, updateSourceRemote } from '../../../../../../actions/admin';
import NotificationUtils from '../../../../../../util/notification';

const { TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;
export class AdminNewsTool extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.changeLink = this.changeLink.bind(this)
    this.changeLang = this.changeLang.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeParentElement = this.changeParentElement.bind(this)
    this.changeChildElement = this.changeChildElement.bind(this)
    this.start = this.start.bind(this)
    this.save = this.save.bind(this)
    this.update = this.update.bind(this)
    this.codeTest = this.codeTest.bind(this)
    this.state ={
      id: '',
      sourceTitle: '',
      link: '',
      frameLink:'',
      code: '',
      lang: 'cn',
      type: 'spider',
      ParentElement:'',
      ChildElement:'',
      result:'',
    }
  }
  componentWillMount(){
    window.addEventListener('message',(e) => {
      if(e.data){
        this.setState({
          ParentElement: e.data.parent,
          ChildElement: e.data.child
        })
      }
    },false);
  }
  componentDidMount() {
    if(this.props && this.props.currentSourceData){
      this.setState({
        id: this.props.currentSourceData.currentId || '',
        link: this.props.currentSourceData.currentLink ? decodeURIComponent(this.props.currentSourceData.currentLink) : '' ,
        lang: this.props.currentSourceData.currentLang || 'cn',
        sourceTitle: this.props.currentSourceData.currentTitle || '',
        type: this.props.currentSourceData.currentType || 'spider',
        code: this.props.currentSourceData.currentCode || ''
      })
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if(nextProps && nextProps.currentSourceData){
      this.setState({
        id: nextProps.currentSourceData.currentId || '',
        link: nextProps.currentSourceData.currentLink ? decodeURIComponent(nextProps.currentSourceData.currentLink) : '',
        lang: nextProps.currentSourceData.currentLang || 'cn',
        sourceTitle: nextProps.currentSourceData.currentTitle || '',
        type: nextProps.currentSourceData.currentType || 'spider',
        code: nextProps.currentSourceData.currentCode || ''
      })
    }
  }

  changeLink = (e: any) =>{
    this.setState({
      link:e.target.value
    })
  }

  changesourceTitle = (e: any) =>{
    this.setState({
      sourceTitle:e.target.value
    })
  }

  changeParentElement = (e: any) =>{
    this.setState({
      ParentElement:e.target.value
    })
  }

  changeChildElement = (e: any) =>{
    this.setState({
      ChildElement:e.target.value
    })
  }

  changeLang = (value: any) =>{
    console.log(value)
    this.setState({
      lang: value
    })
  }

  changeType = (value: any) =>{
    console.log(value)
    this.setState({
      type: value
    })
  }
  start = () =>{ 
    this.setState({
      frameLink: FRAME_API + "/" + encodeURIComponent(this.state.link)  
    })
  }
  save = () => {
    const {sourceTitle, link, lang ,type ,code} = this.state
  
    const data = {
      sourceTitle,
      url: link,
      lang,
      type,
      code
    }
    const { dispatch, history } = this.props;
    dispatch(addSourceRemote(data))
    NotificationUtils.notificationSuccess('添加成功!', '添加成功!', 1.5)
    dispatch(allSourceRemote())
    history.push('/xyt/newsList')
    console.log(data)
  }
  update = () => {
    const {sourceTitle, link, lang ,type ,code} = this.state
    const data = {
      sourceTitle,
      url: link,
      lang,
      type,
      code
    }
    console.log(data)
    const { dispatch, history } = this.props;
    dispatch(updateSourceRemote(this.state.id, data))
    NotificationUtils.notificationSuccess('修改成功!', '修改成功!', 1.5)
    dispatch(allSourceRemote())
    history.push('/xyt/newsList')
    console.log(data)
  }

  onlineTest = () =>{
    const data = {
      source: UrlRegEx(this.state.link)[2].toString(),
      sourceLink: this.state.link,
      parent: this.state.ParentElement, 
      child: this.state.ChildElement, 
      lang: this.state.lang, 
    }
    axios.post(ONLINETEST_API, data)
    .then((data: any) => {
      console.log(JSON.stringify(data.data))
      this.setState({
        result: JSON.stringify(data.data,undefined,2),
        code: this.state.ParentElement + ' ' + this.state.ChildElement 
      })
    })
  }

  codeTest = () =>{
    const data = {
      source: UrlRegEx(this.state.link)[2].toString(),
      sourceLink: this.state.link,
      parent: this.state.ParentElement, 
      child: this.state.ChildElement, 
      lang: this.state.lang, 
      code: this.state.code
    }
    axios.post(ONLINETEST_API, data)
    .then((data: any) => {
      console.log(JSON.stringify(data.data))
      this.setState({
        result: JSON.stringify(data.data,undefined,2)
      })
    })
  }

  render () {

    
    return(
      <div id="AdminNewsTool">
        
        <div className="base">
          <div style={{ marginBottom: 16, marginTop: 32}}>
            <Input addonBefore="名称:" value={this.state.sourceTitle} onChange={this.changesourceTitle}/>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore="链接:" value={this.state.link} onChange={this.changeLink}/>
          </div>
          <div style={{ marginBottom: 16 }}>
             <InputGroup compact>
               <Input style={{ width: 80,  pointerEvents: 'none', }} value="语言选择:" onChange={()=>{}}/>
              <Select value={this.state.lang} onChange={this.changeLang}>
                <Option value="cn">cn</Option>
                <Option value="en">en</Option>
              </Select>
            </InputGroup>
          </div>
          <div style={{ marginBottom: 16 }}>
             <InputGroup compact>
               <Input style={{ width: 80,  pointerEvents: 'none', }} value="类型:"  onChange={()=>{}}/>
              <Select value={this.state.type}  onChange={ this.changeType}>
              <Option value="spider">spider</Option>
              </Select>
            </InputGroup>
          </div>

          <div className="test" style={{ marginTop: 32 }}>
              <Button type="primary" onClick={this.start}>
                 开始测试                
                 <Icon type="arrow-right" />
              </Button>
          </div>
          <div className="test" style={{ marginTop: 32 }}>
              <Button size="large" type="primary" onClick={this.save} ghost  className={` ${this.props.currentSourceData.currentTitle ? 'hide' : 'show'}`}>
                 添加保存            
              </Button>
              
              <Button size="large" type="primary" onClick={this.codeTest} ghost className={` ${this.props.currentSourceData.currentTitle ? 'show' : 'hide'}`}>
                 测试代码              
              </Button>

              <Button size="large" type="primary" onClick={this.update} ghost className={` ${this.props.currentSourceData.currentTitle ? 'show' : 'hide'}`}>
                 更新修改              
              </Button>


          </div>
        </div>
        <div className="demo">
          <div className="frame" >
            <div>Demo:</div>
            <iframe src={this.state.frameLink} ></iframe>
          </div>
          <div className="element"  style={{ marginBottom: 16, marginTop: 16}}>
            <Input addonBefore="父节点:" value={this.state.ParentElement} onChange={this.changeParentElement}/>

            <Input addonBefore="子节点:" value={this.state.ChildElement}  onChange={this.changeChildElement}/>
          </div>

          <div className="test" style={{ marginTop: 8, marginBottom: 8 }}>
              <Button onClick={this.onlineTest}>
                <Icon type="arrow-down" />
                 开始爬取             
              </Button>
          </div>

          <div className="result">
              <TextArea rows={12} value={this.state.result}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentSourceData: state.admin.currentSourceData,

})

AdminNewsTool = connect(mapStateToProps)(AdminNewsTool);

export default AdminNewsTool;
