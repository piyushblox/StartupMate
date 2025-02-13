import { theme } from 'antd'
import { ThemeCommon } from './theme.common'

export const ThemeDark = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...ThemeCommon.token,
    motion: false,
    colorTextBase: 'white',
    colorBgBase: 'black',
    colorPrimary: '#00a1ec',
    colorPrimaryBg: '#eb2f06',
    colorLink: '#00a1ec',
    colorBgContainer: 'black',
  },
  components: {
    ...ThemeCommon.components,
    Layout: {
      headerBg: 'black',
      footerBg: 'black',
      bodyBg: 'black',
      siderBg: '#141414',
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      itemBg: 'transparent',
      itemColor: '#909090',
      itemHoverBg: '#eb2f06',
      itemSelectedBg: '#eb2f06',
      itemSelectedColor: 'white',
      itemActiveBg: 'transparent',
    },
  },
}
