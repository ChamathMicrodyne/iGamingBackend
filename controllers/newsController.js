import News from "../models/news.js";

export async function saveNews(req, res) {
  const lastID = await News.findOne().sort({ id: -1 });
  const newId = lastID && lastID.id ? lastID.id + 1 : 1;

  const news = new News({
    id: newId,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    image: req.body.image,
    reference: req.body.reference || [],
    tags: req.body.tags,
    active: req.body.active ?? true,
  });

  news
    .save()
    .then((savedNews) => {
      res.json({
        message: "News created successfully",
        news: {
          timestamp: savedNews.timestamp.toISOString(),
        },
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to create news",
        error: err,
      });
    });
}

export async function getNews(req, res) {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.json({
      message: "Failed to retrieve categories",
      error: err,
    });
  }
}

export async function getNewsById(req, res) {
  try {
    const news = await News.findOne({
      id: parseInt(req.params.id),
      active: true,
    });
    if (!news) return res.status(404).json({ message: "Article not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteNews(req, res) {
  try {
    await News.deleteOne({ id: req.params.id });

    res.json({
      message: `News deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete news",
      error: err,
    });
  }
}

export async function updateNews(req, res) {
  const newsId = req.params.id;
  const updatingData = req.body;

  try {
    await News.updateOne({ id: newsId }, updatingData);

    res.json({
      message: "News updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    return;
  }
}
