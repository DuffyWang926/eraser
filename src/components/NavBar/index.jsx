// components/NavBar/index.jsx
import { Component } from 'react'
import { View, Image, Text, Picker } from '@tarojs/components'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Taro from '@tarojs/taro'
import logo from '@/assets/logo.png'
import './index.scss'
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
class NavBar extends Component {
  static defaultProps = {
    logoUrl: logo,
    defaultNavItems: [
      { id: 1, pathKey: 'edit', translationKey: 'common.edit' },
      { id: 2, pathKey: 'login', translationKey: 'common.login' },
      { id: 3, pathKey: 'profile', translationKey: 'common.profile' }
    ]
  }

  handleNavigate = (pathKey) => {
    Taro.navigateTo({
      url: `/pages/${pathKey}/index`
    })
  }

  handleLanguageChange = (e) => {
    const value = e.detail.value
    const { i18n } = this.props
    const lang = value === 0 ? 'zh' : 'en'
    
    i18n.changeLanguage(lang)
    Taro.setStorageSync('lang', lang)
    this.forceUpdate()
  }

  render() {
    const { 
      t,
      logoUrl,
      navItems = this.props.defaultNavItems
    } = this.props

    return (
      <View className='nav-container'>
        <View className='nav'>
          <Image
            src={logoUrl}
            className='nav-logo'
            mode='aspectFit'
            onClick={() => this.handleNavigate('home')}
          />
          
          <View className='nav-items'>
            {navItems.map(item => (
              <Text 
                key={item.id}
                className='nav-item'
                onClick={() => this.handleNavigate(item.pathKey)}
              >
                {t(item.translationKey)}
              </Text>
            ))}
          </View>

          <Picker 
            className='lang'
            mode="selector" 
            range={[t('common.Chinese'), t('common.English')]}
            onChange={this.handleLanguageChange}
          >
            <View>
              <Text>{t('common.language')}</Text>
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ counter }) => ({ counter })

// export default connect(mapStateToProps)(
//   withTranslation()(NavBar)
// )
export default  withTranslation()(NavBar)
  