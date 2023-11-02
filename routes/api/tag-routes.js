const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags, including its associated Product data
  try {
    const tags = await Tag.findAll({ include: [{ model: Product }] });
    if (!tags) {
      res.status(404).json('No tags found');
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`, including its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!tag) {
      res.status(404).json('No tag found');
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.status(200).json('New tag created');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json('Tag name updated')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const category = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json('Tag not found');
      return;
    }
    res.status(200).json(`Deleted from database`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
