//this should add ownprops from parent map


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dropNewPin }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DropNewPinButton);
