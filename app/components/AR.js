import React, { Component, StyleSheet, Dimensions, View } from 'react-native';
import Camera from 'react-native-camera';
import WebViewBridge from 'react-native-webview-bridge';
import THREE_RENDER_MARKER from '../lib/threejs/marker.js';
import Location from '../lib/orientation/locationMath.js';

const REF_WEBVIEW_BRIDGE = 'webviewbridge';

const WEBVIEW_STYLE = `
  body {
    color: white;
    margin: 0;
    padding: 0;
    font: 62.5% arial, sans-serif;
    background: transparent;
  }
`;

const HANDLE_ORIENTATION = `
  <script>

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }

    if (window.DeviceOrientationEvent) {
      // Listen for the deviceorientation event and handle the raw data
      window.addEventListener('deviceorientation', function( e ) {
        var compassdir;

        if( e.webkitCompassHeading) {
          // Apple works only with this, alpha doesn't work
          compassdir = e.webkitCompassHeading;  
        }
        else compassdir = e.alpha;

        camera.rotation.y = -degreeToRad( compassdir );

        $("#alpha").text( compassdir );
      }, false );
    }

  </script>
`;

const WEBVIEW_SCRIPTS = `
  <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js"></script>
  ${ THREE_RENDER_MARKER }
  ${ HANDLE_ORIENTATION }
`;

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
    ${ WEBVIEW_STYLE }
    </style>
  </head>
  <body>
    <p id="alpha"></p>
    ${ WEBVIEW_SCRIPTS }
  </body>
</html>
`;

const BRIDGE_INJECT_SCRIPT = `
  function webViewBridgeReady(cb) {
    //checks whether WebViewBridge exists in global scope.
    if (window.WebViewBridge) {
      cb(window.WebViewBridge);
      return;
    }

    function handler() {
      //remove the handler from listener since we don't need it anymore
      document.removeEventListener('WebViewBridge', handler, false);
      //pass the WebViewBridge object to the callback
      cb(window.WebViewBridge);
    }

    //if WebViewBridge doesn't exist in global scope attach itself to document
    //event system. Once the code is being injected by extension, the handler will
    //be called.
    document.addEventListener('WebViewBridge', handler, false);
  }

  webViewBridgeReady( function (webViewBridge) {
    webViewBridge.send( "BRIDGE_READY" );
    webViewBridge.onMessage = function (message) {
      // Message is an array of all of the pins we want to display,
      // where x and z on each pin is the relative location to the
      // device in feet.
      var locs = JSON.parse( message );
      // Loop through all locs,
        // Compare to holder array
        // If index exists in holder array, move it.
        // Otherwise, clone the parent mesh and move it.
        // Delete any meshes in holder indices greater than or equal to locs.length;
    };
  });
`;

export default class AR extends Component {
  constructor(props) {
    super(props);
    // this.props.currLoc = {longitude: ###, latitude: ###}
    // this.props.locs = [{ longitude: #, latitude:# }, { longitude: #, latitude: # }]
  }


  calculateLocs( currentLocation, arrayOfPins ) {
    /*
    currentLocation {
      latitude: Number,
      longitude: Number
    },
    arrayOfPins [
      {
        latitude: Number,
        longitude: Number
      },
      {
        latitude: Number,
        longitude: Number,
      }
    ]
    */
    var locs = [];

    // For each pin in the array of pins,
      // Calculate the relative x and z ( where -x is west, x is east, -z is north, and z is south )
      // Each unit being a foot.

    arrayOfPins.forEach( function( pin ) {
      locs.push( Location.relativeLocsInFeet( currentLocation, pin ) );
    });

    console.log( locs );

    return locs;
  }

  onBridgeMessage( message ) {
    if( message === "BRIDGE_READY" ) {
      var locs = JSON.stringify( this.calculateLocs( this.props.currLoc, this.props.locs ) );
      this.refs.webviewbridge.sendToBridge( locs );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.webviewcont}>
          <WebViewBridge 
            ref={ REF_WEBVIEW_BRIDGE }
            automaticallyAdjustContentInsets={true}
            source={{ html: HTML }}
            style={styles.webView}
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            injectedJavaScript={ BRIDGE_INJECT_SCRIPT }
            javaScriptEnabled={true}
            scalesPageToFit={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    position: 'absolute',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  webviewcont: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent'
  },
  webView: {
    backgroundColor: 'transparent'
  },
});