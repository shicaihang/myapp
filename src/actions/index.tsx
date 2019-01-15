import * as constants from '../constants'

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export interface ResetENTHUSIASM {
    type: constants.RESET_ENTHUSIASM;
}

export interface AddLogENTHUSIASM {
    type: constants.ADD_CONSOLELOG;
    log: string;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | ResetENTHUSIASM | AddLogENTHUSIASM;

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}
export function resetEnthusiasm(): ResetENTHUSIASM {
    return {
        type: constants.RESET_ENTHUSIASM
    }
}
export function addLogEnthusiasm(log: string): AddLogENTHUSIASM {
    return {
        type: constants.ADD_CONSOLELOG,
        log,
    }
}