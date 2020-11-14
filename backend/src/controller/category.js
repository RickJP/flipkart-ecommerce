const slugify = require('slugify');
const Category = require('../models/category');
const shortId = require('shortid');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let c of category) {
    categoryList.push({
      _id: c._id,
      name: c.name,
      slug: c.slug,
      parentId: c.parentId,
      type: c.type,
      children: createCategories(categories, c._id),
    });
  }

  return categoryList;
}

exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortId.generate()}`,
  };

  if (req.file) {
    categoryObj.categoryImage = req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  try {
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        return res.status(201).json({ category });
      }
    });
  } catch (err) {
    console.error('something went wrong');
  }
};

exports.getCategories = (req, res) => {
  console.log('Get Categories');
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== '') {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true },
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== '') {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  console.log(ids);
  const deletedCategories = [];

  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deletedCategories.push(deleteCategory);
  }
  if (deletedCategories.length == ids.length) {
    res.status(204).json({ message: 'Categories remove successfully' });
  } else {
    res.status(400).json({ message: 'Something went terribly wrong!!' });
  }

  // if (deletedCategories.length == ids.length) {
  //   res.status(200).json({ message: 'Categories removed' });
  // } else {
  //   res.status(400).json({ message: 'Something went wrong' });
  // }
};
