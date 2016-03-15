//this should add ownprops from parent map
import dropNewPin from '../actions/action_pins.js';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dropNewPin }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DropNewPinButton);
