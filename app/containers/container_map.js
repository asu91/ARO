import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from '../components/Map.js';

function mapStateToProps({pins}) {
  return { pins };
}
export default connect(mapStateToProps)(Map);
