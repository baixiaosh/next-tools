import '../../action/beta';
import types from '../../types/beta';
const initialState = {
    text: '23423432423'
};
const indexFilter = (state = initialState, action: any) => {
    let copyState = { ...state };
    switch (action.type) {
        case types.BETA_TYPE:
            copyState.text = copyState.text == 'World' ? 'Hello' : 'World';
            return copyState;
        default:
            return copyState;
    }
};

export default indexFilter;
