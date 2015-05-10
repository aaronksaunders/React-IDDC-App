/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var React = require('react-native');
 var LocationList = require('./LocationList');
var MenuView = require('./MenuView');
var SideMenu = require('react-native-side-menu');
var window = require('Dimensions').get('window');
 var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React;


var IDDCApp = React.createClass({
  render() {
        return (
          <SideMenu menu={<MenuView />}>
              <NavigatorIOS
                ref="nav"
                style={styles.container}
                tintColor="#ED6063"
                initialRoute={{
                    title: "I DONT DO CLUBS",
                    component: LocationList,
                   //rightButtonTitle: 'Add',
                    passProps : { nav: this.refs.nav },
                    onRightButtonPress: () => {
                    }
                }}/>
        </SideMenu>);
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily :'Helvetica'
  },
});

AppRegistry.registerComponent('IDDCApp', () => IDDCApp);
