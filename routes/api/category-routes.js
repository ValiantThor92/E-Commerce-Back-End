const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [Product]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // be sure to include its associated Products
    include: [Product],
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    if (!category) {
      res.status(404).json({ message: 'Category does not exist' });
      return;
    }
    res.json(category);
  })
  .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(newCategory => res.json * (newCategory))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
