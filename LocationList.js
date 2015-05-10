'use strict';

var React = require('react-native');
var ItemDetail = require('./ItemDetail');
var {
	StyleSheet,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Navigator,
	Image
} = React;

var styles = StyleSheet.create({
	titleText : {
		fontFamily : 'Helvetica Neue',
		fontWeight: "bold",
	},
	subTitleText : {
		fontFamily : 'Georgia',
		fontStyle: "italic",
		fontWeight: "normal",
		fontSize : 12
	},	
	separator: {
		marginTop: 20,
		height: 1,
		backgroundColor: "#DDDDDD"
	},
	rowContainer: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,	
	},	
  cellImage: {
    height: 193,
    margin: 5,
    width: 320,
  },	
});

var LocationList = React.createClass({

	getInitialState: function() {
	  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  return {
	    dataSource: ds.cloneWithRows([
	    	{ title:'AMARACHI LOUNGE IN DOWNTOWN BROOKLYN', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-brooklyn.jpg', location:'189 Bridge St, Brooklyn, NY 11201'},
	    	{ title:'BED-VYNE BREW IN BEDFORD STUYVESANT', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-brooklyn1.jpg', location:'370 Tompkins Ave, Brooklyn, NY 11216'},
	    	{ title:'BILLIE’S BLACK IN HARLEM', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-harlem.jpg', location:'271 W 119th St, New York, NY 10026'},
	    	{ title:'BLVD BISTRO IN HARLEM', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-harlem1.jpg', location:'239 Malcolm X Blvd, New York, NY 10027'},
	    	{ title:'BROOKLYN BESO IN BEDFORD STUYVESANT', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-brooklyn3.jpg', location:'370 Lewis Ave, Brooklyn, NY 11233'},
	    	{ title:'THE BROOKLYN GREENERY IN PROSPECT LEFFERTS GARDENS', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-brooklyn31.jpg', location:'560 Flatbush Ave, Prospect Lefferts Gardens, NY 11225'},
	    	{ title:'BROOKLYN MOON CAFE IN FORT GREENE', image:'http://www.idontdoclubs.com/wp-content/uploads/2015/05/black-owned-restaurants-in-brooklyn4.jpg', location:'745 Fulton St, Brooklyn, NY 11217'},
	    ])	
	  };
	},

	rowPressed : function(_value) {
        this.props.navigator.push({
            title: _value.title.split(" IN ")[0],
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: ItemDetail,
            passProps : { place : {
            	address : _value.location,
            	fullTitle : _value.title,
            }}
        })
	},

	renderRow : function(_rowData) {
		return (
			<TouchableHighlight onPress={() => this.rowPressed(_rowData)}
				underlayColor="#DDDDDD">
		      <View style={styles.rowContainer}>
		      	<Image source={{uri:_rowData.image}} style={styles.cellImage} resizeMode='contain'></Image>
		        <Text style={styles.titleText}>{_rowData.title}</Text>
		        <Text style={styles.subTitleText}>{_rowData.location}</Text>
		        <View style={styles.separator}></View>
		      </View>
		    </TouchableHighlight>
		)
	},

	render: function() {
	  return (
	    <ListView
	      dataSource={this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
	    />
	  );
	},
});

module.exports = LocationList;