import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { actionCreators }  from './store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from "./style";

class Header extends Component{

  getListArea(){
    const {
      focused,
      mouseIn,
      list,
      page,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleChangePage
    } = this.props;
    const pageList = [];
    const newList = list.toJS();

    for(let i = (page -1) * 10; i < page * 10; i++){
      if(i < newList.length){
        pageList.push(
          <SearchInfoItem key={newList[i]}>{ newList[i] }</SearchInfoItem>
        );
      }
    }
    console.log("mouseIn->" + mouseIn);
    if(focused || mouseIn){
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => { handleChangePage(page,totalPage) }}>换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            { pageList }
          </SearchInfoList>
        </SearchInfo>
      );
    }
  };

  render() {
    const { focused,list, handleInputFocus, handleInputBlur } = this.props;
    return (
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登陆</NavItem>
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                className={focused ? 'focused':''}
                onFocus={() => {handleInputFocus(list)}}
                onBlur={handleInputBlur}
              >
              </NavSearch>
            </CSSTransition>
            <i className={focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
            {
              this.getListArea()
            }
          </SearchWrapper>

        </Nav>
        <Addition>
          <Button className="writting">
            <i className="iconfont">&#xe615;</i>
            写文章
          </Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}



const mapStateToProps = (state) => {
  return {
      focused:state.getIn(['header','focused']),
      list: state.getIn(['header','list']),
      page: state.getIn(['header','page']),
      totalPage: state.getIn(['header','totalPage']),
      mouseIn: state.getIn(['header','mouseIn']),

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if(list.size === 0){
        dispatch(actionCreators.getList());
      }
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page,totalPge) {
      if(page < totalPge){
        ++page;
      }else{
        page = 1;
      }
      dispatch(actionCreators.changePage(page));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);