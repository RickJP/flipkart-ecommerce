// import { IoMdGitNetwork } from 'react-icons/io';
import { categoryConstants } from '../actions/constants';

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let _categories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  for (let c of categories) {
    if (c._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: category.children,
      };
      _categories.push({
        ...c,
        children:
          c.children.length > 0 ? [...c.children, newCategory] : [newCategory],
      });
    } else {
      _categories.push({
        ...c,
        children: c.children
          ? buildNewCategories(parentId, c.children, category)
          : [],
      });
    }
  }
  return _categories;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category,
      );

      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = { ...state, error: action.payload.error };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
