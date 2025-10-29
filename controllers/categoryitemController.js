import Categoryitem from "../models/categoryitem.js";

export async function saveCategoryitem(req, res) {
  const lastID = await Categoryitem.findOne().sort({ id: -1 });
  const newId = lastID && lastID.id ? lastID.id + 1 : 1;

  const categoryitem = new Categoryitem({
    id: newId,
    name: req.body.name,
    active: req.body.active
  });

  categoryitem
    .save()
    .then(() => {
      res.json({
        message: "Categoryitem created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create categoryitem",
        error: err
      });
    });
}

export async function getCategoryitem(req, res) {
  try {
      const categoryitem = await Categoryitem.find();
      res.json(categoryitem);
  } catch (err) {
    res.json({
      message: "Failed to retrieve categoryitems",
      error: err,
    });
  }
}

export async function deleteCategoryitem(req, res) {

  try {
    await Categoryitem.deleteOne({ id: req.params.id });

    res.json({
      message: `Categoryitem deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete categoryitem",
      error: err,
    });
  }
}

export async function updateCategoryitem(req, res) {
  const categoryitemId = req.params.id;
  const updatingData = req.body;

  try {
    await Categoryitem.updateOne({ id: categoryitemId }, updatingData);

    res.json({
      message: "Categoryitem updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}