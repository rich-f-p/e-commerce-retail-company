const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catergories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(catergories);
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const id = await Category.findByPk(req.params.id,{
      include: [{model: Product}],
  });
    res.status(200).json(id)
  } catch (err){
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body)
    res.status(200).json(newCat);
  }catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name
    },{
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updatedCategory);
  } catch {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteId = await Category.destroy({
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
