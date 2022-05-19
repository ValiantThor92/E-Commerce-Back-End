const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [{
      model: Product,
      through: ProductTag
    }]
  })
  .then(tagData => res.json(tagData))
  .catch(err => res.json(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Product data
    include: [{
      model: Product,
      through: ProductTag
    }]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'tag doesnt exist'});
      return
    }
    res.json(tag);
  })
  .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag => res.json(newTag))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedTag => {
    if (!updatedTag) {
      res.status(404).json({ message: 'No existing tag with this ID' });
      return
    }
    res.json(updatedTag)
  })
  .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
