//
//  CiGeoCodeAddressUtil.h
//  IDDCApp
//
//  Created by Aaron saunders on 5/9/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTBridge.h"
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"

#import <CoreLocation/CLError.h>
#import <CoreLocation/CLLocationManager.h>
#import <CoreLocation/CLLocationManagerDelegate.h>
#import <CoreLocation/CLGeocoder.h>
#import <CoreLocation/CLPlacemark.h>
#import <MapKit/MKPlacemark.h>

@interface CiGeoCodeAddressUtil : NSObject <RCTBridgeModule>
@end
