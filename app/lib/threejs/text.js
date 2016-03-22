export default THREE_RENDER_TEXT = `
<script src="http://mrdoob.github.com/three.js/examples/fonts/helvetiker_regular.typeface.js"></script>
<script>
  var textmodels = [];
  // var font;

  // var loader = new THREE.FontLoader();
  // loader.load( 'http://mrdoob.github.com/three.js/examples/fonts/helvetiker_regular.typeface.js', function( response ) {
  //   font = response;
  // })

  // var createTextModel = function( text ) {
  //   var parameters = {
  //     font: font,
  //     size: 50,
  //     height: 1,
  //   };
  //   var textGeometry = new THREE.TextGeometry( text, parameters );
  //   var textMaterial = new THREE.MeshNormalMaterial();
  //   return new THREE.Mesh( textGeometry, textMaterial );
  // };

  var createTextModel = function( text ) {

    var canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    var context = canvas.getContext('2d');
    context.font = "Bold 300px Helvetica";
    context.fillStyle = 'white';
    context.fillRect( 0, 0, 1000, 400 );
    context.fillStyle = "rgba( 170, 170, 227, 1.0 )";
    context.fillText( text, 0, 300 );

    var texture = new THREE.Texture( canvas );
    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );

    return new THREE.Mesh(
      new THREE.PlaneGeometry( 30, 30 ),
      material
    );
  }
</script>
`;