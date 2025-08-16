const { fetchFeedData } = require("../utils/fetchservice");

exports.getFeed = async (req, res) => {
  try {
    const { query = "", pageNumber = 1, maxPage = 10 } = req.query;

    const cacheKey = query
      ? `github:search:${query}:${pageNumber}:${maxPage}`
      : `github:search:default:${pageNumber}:${maxPage}`;

    // Include pageNumber in GitHub search URL
    const searchUrl = query
      ? `https://github.com/search?q=${encodeURIComponent(
          query
        )}&type=marketplace&query=is%3Asponsorable&p=${pageNumber}`
      : `https://github.com/search?q=trending&type=marketplace&p=${pageNumber}`;

    const requestBody = { url: searchUrl, pageNumber, maxPage, cookies: [] };

    const data = await fetchFeedData(cacheKey, requestBody, 600);
    return res.json(data);
  } catch (err) {
    console.error("Controller Error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from RapidAPI" });
  }
};
