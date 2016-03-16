import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewContainer from '../components/ViewContainer.js';


// export default class MapContainer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       location: {
//         long: null,
//         lat:null
//       }
//   };
//   //include fetching function from maps
//   render() {
//     return React.createElement(Map, { location: this.state.location });
//   }

//   };
// }
function getLocation() {

}

function mapStateToProps(state) {
  return {
    pins: state.pins,
    // currentPin: getLocation()
  };
}
function mapDispatchToProps(dispatch){
  return {
     actions: bindActionCreators({ }, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

