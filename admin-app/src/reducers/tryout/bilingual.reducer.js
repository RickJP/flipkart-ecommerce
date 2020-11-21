import { bilingualConstants } from '../../actions/constants';

const initialState = {
  bilingualDocs: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case bilingualConstants.GET_BILINGUAL_DOCS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case bilingualConstants.GET_BILINGUAL_DOCS_SUCCESS:
      state = {
        ...state,
        bilingualDocs: action.payload.bilingualDocs,
        loading: false,
      };
      break;
    case bilingualConstants.GET_BILINGUAL_DOCS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
