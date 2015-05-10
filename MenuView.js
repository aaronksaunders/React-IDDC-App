/**
 *
 */

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var MenuView = React.createClass({
  render: function() {
    return (

        <Text style={styles.buttonLabel}>
          THIS IS THE MENU VIEW
        </Text>

    );
  }
});

var styles = StyleSheet.create({
  button: {
  	flexDirection: 'row',
  	margin : 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth : .5
  }, 
  buttonLabel: {
    color: 'black',
  },
});

module.exports = MenuView;