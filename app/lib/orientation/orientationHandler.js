
export default HANDLE_ORIENTATION = `
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

        // Handle directional indicator:
        // Examine the bearing of each pin relative to the camera's heading.
        // Render ( or not ) an indicator for the appropriate direction.

        $("#alpha").text( compassdir );
      }, false );
    }

  </script>
`;
