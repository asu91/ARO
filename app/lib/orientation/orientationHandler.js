
export default HANDLE_ORIENTATION = `
  <script>

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }

    var leftOrRight = function( A, B ) {
      return ( -1 * A.x * B.z ) + ( A.z * B.x ) > 0 ? 'left' : 'right';
    }

    var angleFromCamera = function( vector ) {
      return camera.getWorldDirection().angleTo( vector );
    }

    var inFrustum = function( vector ) {
      return frustum.containsPoint( vector );
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

        // Set camera's heading
        camera.rotation.y = -degreeToRad( compassdir );
        
        // Configure frustum
        camera.updateMatrix(); // make sure camera's local matrix is updated
        camera.updateMatrixWorld(); // make sure camera's world matrix is updated
        camera.matrixWorldInverse.getInverse( camera.matrixWorld );
        frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );

        // Handle directional indicator:
        // findOffCameraObjects( meshes, function( mesh ) {
        //   // For each pin not in frustum,
        //     // Determine whether it is to the left or to the right
        //     // Render ( or not ) an indicator for the appropriate direction.
        // });

        $("#alpha").text( camera.rotation.y );

        $("#aws").text( "AWS " + angleFromCamera( meshes[0].position ) + " " + inFrustum( meshes[0].position ) + " " + leftOrRight( camera.getWorldDirection(), meshes[0].position ) );
        $("#punjab").text( "Punjab: " + angleFromCamera( meshes[1].position ) + " " + inFrustum( meshes[1].position ) + " " + leftOrRight( camera.getWorldDirection(), meshes[1].position ) );
        $("#hr").text( "HR: " + angleFromCamera( meshes[2].position ) + " " + inFrustum( meshes[2].position ) + " " + leftOrRight( camera.getWorldDirection(), meshes[2].position ) );
        $("#starbucks").text( "SB: " + angleFromCamera( meshes[3].position ) + " " + inFrustum( meshes[3].position ) + " " + leftOrRight( camera.getWorldDirection(), meshes[3].position ) );
      }, false );
    }

  </script>
`;
