import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import UserChat from './components/UserChat';
import UserSAN from './components/UserSAN';
import { Icon } from 'native-base'

UserChat.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="md-chatbubbles" style={{ color: tintColor }} />
  )
}
UserSAN.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="people" style={{ color: tintColor }} />
  )
}

const App = createAppContainer(createMaterialTopTabNavigator({
  UserChat: {
    screen: UserChat
  },
  UserSAN: {
    screen: UserSAN
  }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: 'white'
          }
        })
      },
      indicatorStyle: {
        backgroundColor: '#1E6EC7'
      },
      activeTintColor: '#1E6EC7',
      inactiveTintColor: '#d1cece',
      pressColor: '#1E6EC7',
      showLabel: false,
      showIcon: true,

    }
  }))
export default App;