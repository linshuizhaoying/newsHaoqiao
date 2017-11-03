import * as React from 'react';
import Loader from '../../../../../../components/Loader/index';
import NewsList from '../../../../../../components/NewsList/index';
import {
  // AutoComplete,
  // Button,
  // Icon,
  // Input
  } from 'antd';
import { connect } from 'react-redux';
import './index.less';

// const Option = AutoComplete.Option;
// const OptGroup = AutoComplete.OptGroup;
// const Search = Input.Search;
export class DebugSearch extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.searchData = this.searchData.bind(this)
    this.state = {
      loading: false,
      currentDailyData:''
    }
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  searchData =(type: string, item: string) => {
    // console.log('searchTagData',item)
    let data = {
      "total":20, // 一共多少页
      "newsList":[]
    }
    this.setState({loading:true})
    setTimeout(()=>{
      this.setState({
        loading:false,
        currentDailyData: data.newsList
      })
    },2000)
  } 

  render () {
    // const dataSource = [
    //   {
    //     title: '搜索范围',
    //     children: [
    //       {
    //         title: '每日咨询搜索'
    //       },
    //       {
    //         title: '搜索引擎'
    //       }, {
    //         title: '博客搜索'
    //       }, {
    //         title: '社区搜索(Github等)'
    //       },
    //       , {
    //         title: '全部搜索'
    //       }
    //     ]
    //   }
    // ]     


    // const options = dataSource.map(group => (
    //   <OptGroup
    //     key={group.title}
    //     label={group.title}
    //   >
    //     {group.children.map(opt => (
    //       <Option key={opt ? opt.title : '' + ':'} value={opt ? opt.title : '' }>
    //         {opt ? opt.title : ''  + ':'}
    //       </Option>
    //     ))}
    //   </OptGroup>
    // ))
    
    return(
      <div id="DebugSearch">
       
        <div className="certain-wrapper">
        {/* <AutoComplete
          dataSource={options}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Search
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
            placeholder="Search..."
            onSearch={value => {
              let searchType = value.substring(0, value.indexOf(':'))
              let newValue = value.substring(value.indexOf(':') + 1)
              console.log(searchType)
              console.log(newValue)
              this.searchData(searchType,newValue)
            }}
          />
        </AutoComplete> */}
      </div>
      <Loader show={this.state.loading} ></Loader>
      <NewsList show={!this.state.loading} data={this.state.currentDailyData} tagList={this.props.tagList}></NewsList>

      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  tagList: state.info.tagList
})

export default connect(mapStateToProps)(DebugSearch)