import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Text, Picker, Button  } from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import logo from '@/assets/logo.png'
import { withTranslation, WithTranslation } from 'react-i18next';
import './index.scss'
import Taro from '@tarojs/taro';
import NavBar from '@/components/NavBar'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  
  handleNavigate = (path) => {
    Taro.navigateTo({
      url: `/pages/${path}/${path}`
    })
  }

  changeLanguage = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
    Taro.setStorageSync('lang', lang); // 持久化存储
  };

  handleChange = (e) => {
    const value = e.detail.value
    if(value == 0){
      this.changeLanguage('zh')
    }else if(value == 1){
      this.changeLanguage('en')
    }
  };

  render () {
    const { t } = this.props;
    return (
      <View className='editPage'>
        <NavBar/>
        <View className='editMid'>

        </View>
      </View>
    )
  }
}

export default withTranslation()(Index);

