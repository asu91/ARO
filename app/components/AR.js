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
  alert( "BRIDGE INJECT SCRIPT INJECTED" );
  function webViewBridgeReady(cb) {
    //checks whether WebViewBirdge exists in global scope.
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
    alert( "WEB VIEW BRIDGE READY" );
    webViewBridge.onMessage = function (message) {
      alert( message );
      // Message is an array of all of the pins we want to display,
      // where x and z on each pin is the relative location to the
      // device in feet.
      var locs = JSON.parse( message );
      mesh.position.x = locs[0].x;
      mesh.position.z = locs[0].z;
    };
  });
`;

const testArray = [
  { name: 'AWS', latitude: 37.7832379, longitude: -122.4084653 },    // AWS
  { name: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 } ];  // Punjab

const testLoc = { latitude: 37.7836881, longitude: -122.4088256 }; // Test location

// Expect AWS to be south east ( around 135 )

export default class AR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locs: testArray,
    }
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

  componentDidMount() {
    var locs = JSON.stringify( this.calculateLocs( testLoc, this.state.locs ) );
    setTimeout( () => {
      this.refs.webviewbridge.sendToBridge( locs );
    }, 5000);
    console.log( "message fired" );
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