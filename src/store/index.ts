import { createStore } from 'redux';
import { enthusiasm } from '../reducers';

const Store = createStore(enthusiasm, {
    enthusiasmLevel: 1,
    name: 'React',
    logs: [],
});

export default Store;