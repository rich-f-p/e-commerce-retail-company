const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through:ProductTag}],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id,{
      include: [{ model: Product, through:ProductTag}],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag);
  }catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },{
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updatedTag);
  } catch {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteId = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteId) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    res.status(200).json(deleteId);
  } catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
