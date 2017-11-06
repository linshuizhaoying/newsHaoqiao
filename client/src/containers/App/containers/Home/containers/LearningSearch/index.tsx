import * as React from 'react';
import Loader from '../../../../../../components/Loader/index';
import NewsList from '../../../../../../components/NewsList/index';
import { connect } from 'react-redux';
import './index.less';

// const Option = AutoComplete.Option;
// const OptGroup = AutoComplete.OptGroup;
// const Search = Input.Search;
export class LearningSearch extends React.Component<any, any> {
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
    //     title: '学习资料',
    //     children: [
    //       {
    //         title: '从入门到精通'
    //       }
    //     ]
    //   }, {
    //     title: '电子书资源',
    //     children: [
    //       {
    //         title: 'pdf'
    //       }, {
    //         title: 'mobi'
    //       }, {
    //         title: 'equip'
    //       }, {
    //         title: '电子书所有格式'
    //       }
    //     ]
    //   }, {
    //     title: '电影资源',
    //     children: [
    //       {
    //         title: 'Movie所有格式'
    //       }
    //     ]
    //   }, {
    //     title: '其他资源',
    //     children: [
    //       {
    //         title: 'Other所有格式'
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
    //       <Option key={opt.title+ ':'} value={opt.title}>
    //         {opt.title + ':'}
    //       </Option>
    //     ))}
    //   </OptGroup>
    // ))
    
    return(
      <div id="LearningSearch">
       
        <div className="certain-wrapper">
        {/* <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          dataSource={options}
          placeholder="input here"
          optionLabelProp="value"
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



export default connect(mapStateToProps)(LearningSearch)