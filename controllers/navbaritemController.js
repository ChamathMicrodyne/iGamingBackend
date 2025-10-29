import Navbaritem from "../models/navbaritem.js";

export async function saveNavbaritem(req, res) {
  const lastID = await Navbaritem.findOne().sort({ id: -1 });
  const newId = lastID && lastID.id ? lastID.id + 1 : 1;

  const navbaritem = new Navbaritem({
    id: newId,
    name: req.body.name,
    destination: req.body.destination,
    active: req.body.active
  });

  navbaritem
    .save()
    .then(() => {
      res.json({
        message: "Navbaritem created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create navbaritem",
        error: err
      });
    });
}

export async function getNavbaritem(req, res) {
  try {
      const navbaritem = await Navbaritem.find();
      res.json(navbaritem);
  } catch (err) {
    res.json({
      message: "Failed to retrieve navbaritems",
      error: err,
    });
  }
}

export async function deleteNavbaritem(req, res) {

  try {
    await Navbaritem.deleteOne({ id: req.params.id });

    res.json({
      message: `Navbaritem deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete navbaritem",
      error: err,
    });
  }
}

export async function updateNavbaritem(req, res) {
  const navbaritemId = req.params.id;
  const updatingData = req.body;

  try {
    await Navbaritem.updateOne({ id: navbaritemId }, updatingData);

    res.json({
      message: "Navbaritem updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}