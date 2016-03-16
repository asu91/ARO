import React, { Component, StyleSheet, Dimensions, View } from 'react-native';
import Camera from 'react-native-camera';
import WebViewBridge from 'react-native-webview-bridge';

const WEBVIEW_STYLE = `
  body {
    color: white;
    margin: 0;
    padding: 0;
    font: 62.5% arial, sans-serif;
    background: transparent;
  }
`;

const THREE_RENDER_MARKER = `
  <script>
    var camera, scene, renderer;
    var mesh;
    var hemiLight;

    init();
    animate();

    function init() {

      /* CAMERA */

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5280 );

      scene = new THREE.Scene();

      /* LIGHTS */
      hemiLight = new THREE.HemisphereLight( 0x2194ce, 0x2194ce, 1.25 );
      hemiLight.groundColor.setHSL( 0.6, 1, 0.6 );
      hemiLight.color.setHSL( 0.095, 1, 1.0 );
      hemiLight.position.set( 0, 500, 0 );
      scene.add( hemiLight );

      /* MARKER */

      var geometry = new THREE.Geometry();

      var height = 10;
      var heightsplit = .75
      var width = 4;

      geometry.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( width/2, height * heightsplit, 0 ),
        new THREE.Vector3( 0, height * heightsplit, -1 * width/2 ),
        new THREE.Vector3( -1 * width/2, height * heightsplit, 0 ),
        new THREE.Vector3( 0, height * heightsplit, width/2 ),
        new THREE.Vector3( 0, height, 0 )
      );

      geometry.faces.push(
        new THREE.Face3( 0, 1, 2 ),
        new THREE.Face3( 0, 2, 3 ),
        new THREE.Face3( 0, 3, 4 ),
        new THREE.Face3( 4, 1, 0 ),
        new THREE.Face3( 5, 2, 1 ),
        new THREE.Face3( 5, 3, 2 ),
        new THREE.Face3( 4, 3, 5 ),
        new THREE.Face3( 1, 4, 5 )
      );

      geometry.computeFaceNormals();
      geometry.computeVertexNormals();

      geometry.computeBoundingBox();

      var material = new THREE.MeshPhongMaterial( { specular: 0x111111, color: 0xffffff, shininess: 100, shading: THREE.FlatShading, side: THREE.FrontSide } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      /* RENDER SCENE */

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      
      document.body.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestAnimationFrame( animate );

      render();

    }

    function render() {

      mesh.rotation.y += 0.01;

      renderer.render( scene, camera );

    }
  </script>
`;

const WEBVIEW_SCRIPTS = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js"></script>
  ${ THREE_RENDER_MARKER }
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
    ${ WEBVIEW_SCRIPTS }
  </body>
</html>
`;

const BRIDGE_INJECT_SCRIPT = `
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

  webViewBridgeReady(function (webViewBridge) {
    webViewBridge.onMessage = function (message) {
      mesh.position.x = parseInt( JSON.parse( message ).x );

      // webViewBridge.send("message from webview");
    };
  });
`;

export default class AR extends Component {
  constructor(props) {
    super(props);
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
            ref="webviewbridge"
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