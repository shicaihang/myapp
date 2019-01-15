import Man from './man';
import store from 'src/store';
import * as EnthusiasmAction from 'src/actions';

export function TestClass (){
    const man = new Man('Steven', 20);
    man.setAge = 25;
    let log = `name:${man.getName};age:${man.getAge};`
    store.dispatch(EnthusiasmAction.addLogEnthusiasm(log));
    log = `${man.getStaticProp()}`;
    store.dispatch(EnthusiasmAction.addLogEnthusiasm(log));

    const typeOfMan: typeof Man = Man;
    typeOfMan.staticProp = 'i update this static prop';
    const man2 = new typeOfMan('Steven', 20);
    let log2 = `name:${man.getName};age:${man.getAge};`
    log2 = `${man2.getStaticProp()}`;
    store.dispatch(EnthusiasmAction.addLogEnthusiasm(log2));
    store.dispatch(EnthusiasmAction.addLogEnthusiasm(`${typeOfMan === Man}`));
}
