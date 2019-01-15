import Log from '../components/log';
import * as actions from '../actions';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export function mapStateToProps({ logs }: StoreState) {
  return {
    logs,
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
    addLog: (log:string) => dispatch(actions.addLogEnthusiasm(log)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);