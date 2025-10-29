import {Description, SocialMedia, HotlinesNumbers} from '../models/footer.js'

export async function saveDescription(req, res) {

  // Find the user with the highest id
  const lastUser = await Description.findOne().sort({ id: -1 });
  const newId = lastUser && lastUser.id ? lastUser.id + 1 : 1;

  const description = new Description({
    id: newId,
    description: req.body.description,
  });

  description
    .save()
    .then(() => {
      res.json({
        message: "Description created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create Description",
        error: err,
      });
    });
}
export async function saveSocialMedia(req, res) {

  // Find the user with the highest id
  const lastreqSocialMedia = await SocialMedia.findOne().sort({ id: -1 });
  const newId =
    lastreqSocialMedia && lastreqSocialMedia.id ? lastreqSocialMedia.id + 1 : 1;

  const socialMedia = new SocialMedia({
    id: newId,
    icon: req.body.icon,
    name: req.body.name,
    link: req.body.link,
  });

  socialMedia
    .save()
    .then(() => {
      res.json({
        message: "SocialMedia created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create SocialMedia",
        error: err,
      });
    });
}
export async function saveHotlinesNumbers(req, res) {
  // Find the user with the highest id
  const lastreqHotlinesNumbers = await HotlinesNumbers
    .findOne()
    .sort({ id: -1 });
  const newId =
    lastreqHotlinesNumbers && lastreqHotlinesNumbers.id
      ? lastreqHotlinesNumbers.id + 1
      : 1;

  const hotlinesNumbers = new HotlinesNumbers({
    id: newId,
    number: req.body.number,
  });

  hotlinesNumbers
    .save()
    .then(() => {
      res.json({
        message: "HotlinesNumbers created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create HotlinesNumbers",
        error: err,
      });
    });
}

export async function getDescription(req, res) {
  try {
    const description = await Description.find();
    res.json(description);
  } catch (err) {
    res.json({
      message: "Failed to retrieve Description",
      error: err,
    });
  }
}
export async function getSocialMedia(req, res) {
  try {
    const socialMedia = await SocialMedia.find();
    res.json(socialMedia);
  } catch (err) {
    res.json({
      message: "Failed to retrieve SocialMedia",
      error: err,
    });
  }
}
export async function getHotlinesNumbers(req, res) {
  try {
    const hotlinesNumbers = await HotlinesNumbers.find();
    res.json(hotlinesNumbers);
  } catch (err) {
    res.json({
      message: "Failed to retrieve HotlinesNumbers",
      error: err,
    });
  }
}

export async function deleteDescription(req, res) {
  try {
    await Description.deleteOne({ id: req.params.id });

    res.json({
      message: `Description deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete Description",
      error: err,
    });
  }
}
export async function deleteSocialMedia(req, res) {
  try {
    await SocialMedia.deleteOne({ id: req.params.id });

    res.json({
      message: `SocialMedia deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete SocialMedia",
      error: err,
    });
  }
}
export async function deleteHotlinesNumbers(req, res) {
  try {
    await HotlinesNumbers.deleteOne({ id: req.params.id });

    res.json({
      message: `HotlinesNumbers deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete HotlinesNumbers",
      error: err,
    });
  }
}


export async function updateDescription(req, res) {
  const ParamId = req.params.id;
  const updatingData = req.body;

  try {
    await Description.updateOne({ id: ParamId }, updatingData);

    res.json({
      message: "Description updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}
export async function updateSocialMedia(req, res) {
  const ParamId = req.params.id;
  const updatingData = req.body;

  try {
    await SocialMedia.updateOne({ id: ParamId }, updatingData);

    res.json({
      message: "SocialMedia updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}
export async function updateHotlinesNumbers(req, res) {
  const ParamId = req.params.id;
  const updatingData = req.body;

  try {
    await HotlinesNumbers.updateOne({ id: ParamId }, updatingData);

    res.json({
      message: "HotlinesNumbers updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}