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
  
  handleNavigate = (type) => {
    let url = ''
    if(type = 0){
      url = `/pages/index/index`
    }else if(type = 1){
      url = `/pages/edit/index`
    }else if(type = 2){
      url = `/pages/login/index`
    }else if(type = 3){
      url = `/pages/mine/index`
    }
    Taro.navigateTo({
      url
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
      <View className='index'>
        
        <NavBar/>

        <View className='edit'>
          <Text className='editTitle'>
            <View className='editTop'>
              <Text >
              {t('common.remove')} 
              </Text>
              <Text className='topBold'>
              {t('common.unwanted')} {t('common.objects')},{t('common.people')}, {t('common.text')},
              </Text>
              <Text >
              {t('common.inSeconds')}!
              </Text>
            </View>
            <View className='editFoot'>
              <View className='editFoot'>
              {t('common.editADOne')}
              </View>
              <View className='editFoot'>
              {t('common.editADTwo')}
              </View>
            </View>
          </Text>
          <View className='editCon'>
            <Image
                  src={logo}
                  className='nav-logo'
                  mode='aspectFit'
                  onClick={() => this.handleNavigate(1)}
              />
              <Button className='tryButton' onClick={() => this.handleNavigate(1)}>{t('common.tryNow')}</Button>
          </View>


        </View>
      </View>
    )
  }
}

export default withTranslation()(Index);

