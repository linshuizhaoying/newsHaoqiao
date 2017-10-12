import * as React from 'react';
import axios from 'axios';
import {
  Button,
  Icon,
  Input,
  Select
  } from 'antd';
import { UrlRegEx } from '../../util/tools';
import './index.less';
import { FRAME_API, ONLINETEST_API } from 
'../../service/api/index';

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

    this.state ={
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
  componentDidMount() {
    console.log(this.props.match)
    this.setState({
      link:this.props.match.params.link !== 'empty' ? decodeURIComponent(this.props.match.params.link): ''
    })
    window.addEventListener('message',(e) => {
      if(e.data){
        this.setState({
          ParentElement: e.data.parent,
          ChildElement: e.data.child
        })
      }
    },false);
    
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
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
      link,
      lang,
      type,
      code
    }
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
        code: 'node = "' +  this.state.ParentElement + ' ' + this.state.ChildElement + '"'
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
              <Select defaultValue="cn" onChange={this.changeLang}>
                <Option value="cn">cn</Option>
                <Option value="en">en</Option>
              </Select>
            </InputGroup>
          </div>
          <div style={{ marginBottom: 16 }}>
             <InputGroup compact>
               <Input style={{ width: 80,  pointerEvents: 'none', }} value="类型:"  onChange={()=>{}}/>
              <Select defaultValue="spider"  onChange={ this.changeType}>
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
              <Button size="large" type="primary" onClick={this.save} ghost>
                 保存               
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


export default AdminNewsTool;
