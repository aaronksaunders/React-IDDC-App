/**
 *
 * @see https://github.com/facebook/react-native/issues/1029 to explain map rendering
 */
'use strict';
var React = require('react-native');
var ActionSheetIOS = require('ActionSheetIOS');

var {
    StyleSheet,
    ScrollView,
    View,
    Text,
    MapView,
    } = React;


// Load Up our Native Module..
var {
    CiGeoCodeAddressUtil
} = require('NativeModules');

CiGeoCodeAddressUtil.geoCodeAddress("370 Tompkins Ave, Brooklyn, NY 11216", 
    function(_results){
      console.log(_results);
    });

var moment = require('moment');
//var TextLabelPanel = require('../Components/TextLabelPanel');
var Button = require('./Button');
var TimerMixin = require('react-timer-mixin');



var ItemDetail = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function () {
        return {
            showMap : false,
            currentPlace : this.props.place,
            //relativeTime: moment(this.props.session.createdAt).startOf('hours').fromNow(),
            annotations: [{
                longitude: 0,
                latitude: 0,
                title: 'You Are Here'
            }],
            mapRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: .01,
                longitudeDelta: .01
            }
        };
    },


    showShareActionSheet: function () {
        var address = this.state.placeInformation.address.FormattedAddressLines;

        ActionSheetIOS.showShareActionSheetWithOptions({
                title:"Share Information",
                message : this.state.currentPlace.fullTitle + " located at " + 
                address[0] + ", " + address[1] + " ",
                url: 'https://code.facebook.com',
            },
            (error) => {
                console.error(error);
            },
            (success, method) => {
                var text;
                if (success) {
                    text = `Shared via ${method}`;
                } else {
                    text = 'You didn\'t share';
                }
                this.setState({text})
            });
    },

    setMapInformation: function(_placeInformation) {
        this.setState({
            showMap: true,
            placeInformation : _placeInformation,
            annotations: [{
                longitude: _placeInformation.coords.longitude,
                latitude: _placeInformation.coords.latitude,
                title: _placeInformation.address.FormattedAddressLines[0], 
                subtitle : _placeInformation.address.FormattedAddressLines[1]
            }],
            mapRegion: {
                longitude: _placeInformation.coords.longitude,
                latitude: _placeInformation.coords.latitude,
                latitudeDelta: .005,
                longitudeDelta: .005
            }
        });
    },

    componentDidMount: function() {
        var that = this;

        CiGeoCodeAddressUtil.geoCodeAddress(
            that.props.place.address, 
            function(_results){   
                that.setTimeout(function() {
                    that.setMapInformation(_results);
                }.bind(that), 250);
                console.log(_results);
            }
        );

    },

    renderMap: function() {
        if (this.state.showMap) {
            var address = this.state.placeInformation.address.FormattedAddressLines;
            return (
                <View>
                    <MapView region={this.state.mapRegion} style={styles.map}
                         annotations={this.state.annotations}/>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>
                            {address[0] + ", " + address[1]}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.map, {backgroundColor: '#cccccc'}]} />
            );
        }
    },

    render: function () {
        //  alert(JSON.stringify(this.state.annotations));

        return (
            <ScrollView>
                {this.renderMap()}
                <Button
                    onPress={() => alert("Get Directions")}
                    label="Get Directions"/>
                <Button
                    onPress={() => alert("View Website")}
                    label="View Website"/>
                <Button
                    onPress={() => this.showShareActionSheet()}
                    label="Share Place Information"/>
                                    <Button
                    onPress={() => alert("Call For Information")}
                    label="Call For Information"/>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    map: {
        height: 250
    },
    addressContainer : {
        paddingTop : 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressText : {
        fontFamily : 'Helvetica Neue',
        fontWeight: "bold",
    }
});

module.exports = ItemDetail;
