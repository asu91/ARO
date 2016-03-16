//this should add ownprops from parent map
import dropNewPin from '../actions/action_pins.js';
import DropNewPinButton from '../components/DropNewPinButton.js';

mapDispatchToState(dispatch) {
  return {
    dropNewPin: bindActionCreator({dropNewPin}, dispatch)
}
export default connect(mapStateToProps, {dropNewPin})(DropNewPinButton);
