import Hello from '../components/hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, name }: StoreState) {
  return {
    enthusiasmLevel,
    name,
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onReset: () => dispatch(actions.resetEnthusiasm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);