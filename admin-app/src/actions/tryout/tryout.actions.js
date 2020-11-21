import axios from '../../helpers/axios';
import { bilingualConstants } from '../constants';

const getBilingualDocs = () => {
  return async (dispatch) => {
    dispatch({ type: bilingualConstants.GET_BILINGUAL_DOCS_REQUEST });
    const res = await axios.get('/tryout/bilingual');

    if (res.status === 200) {
      const { docs } = res.data;
      dispatch({
        type: bilingualConstants.GET_BILINGUAL_DOCS_SUCCESS,
        payload: { bilingualDocs: docs },
      });
    } else {
      dispatch({
        type: bilingualConstants.GET_BILINGUAL_DOCS_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export { getBilingualDocs };
