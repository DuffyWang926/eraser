import React, { useRef } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import './index.scss'

const FileUploader = ({ 
  onFileChange, 
  supportedFormats = ['image/jpeg', 'image/png', 'image/avif', 'image/webp'],
  errorMessage 
}) => {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)
  
  // 获取格式显示文本
  const getFormatsText = () => {
    const formatMap = {
      'image/jpeg': 'JPEG',
      'image/png': 'PNG',
      'image/avif': 'AVIF',
      'image/webp': 'WEBP'
    }
    return supportedFormats.map(f => formatMap[f] || f).join(', ')
  }

  // 处理文件选择（H5/PC）
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    validateAndEmit(file)
  }

  // 处理小程序文件选择
  const handleChooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      })
      validateAndEmit(res.tempFiles[0])
    } catch (error) {
      console.error('Failed to choose image:', error)
    }
  }

  // 文件验证
  const validateAndEmit = (file) => {
    if (!file) return
    
    const isValid = supportedFormats.includes(file.type)
    if (isValid && onFileChange) {
      onFileChange(file)
    } else if (!isValid && onError) {
      onError(t('upload.error'))
    }
  }

  return (
    <View className="fileUploader">
      
      <View
        className="uploadBox"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          accept={supportedFormats.join(',')}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button className="uploadBtn">
          {t('upload.uploadPicture')}
        </Button>
      </View>


      <View className="uploadInfo">
        <Text className="supportedFormats">
          {t('upload.supportedFormats')} { getFormatsText()}
        </Text>
        {errorMessage && (
          <Text className="error-message">{errorMessage}</Text>
        )}
      </View>
    </View>
  )
}

export default FileUploader