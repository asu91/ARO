export default THREE_RENDER_TEXT = `
<script src="http://threejs.org/examples/fonts/gentilis_regular.typeface.js"></script>
<script>
  var createTextModel = function( text ) {
    var font = 'gentilis';
    var parameters = {
      font: font,
      size: 16,
      height: 50.0,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 10.0,
      bevelSize: 8.0,
    };
    var geometry = new THREE.TextGeometry( text, parameters );

  }
</script>
`;