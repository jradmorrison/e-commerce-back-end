const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories, including it's associated products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, including its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
