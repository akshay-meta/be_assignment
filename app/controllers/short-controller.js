const Short = require("../models/short");
const shortid = require("shortid");
const short = module.exports;

// Save Short URI
short.saveShortUrI = async function saveShortUrI(req, res) {
  try {
    if (!req.body.fullUrl)
      return res.status(404).send("Missing Required Fields");

    if (!isValidUrl(req.body.fullUrl))
      return res.status(404).send("Invalid URI");

    shortid.worker(1);
    let getShortId = shortid.generate();
    req.body.short = getShortId,
    req.body.shortUrl = `${req.headers.origin}/${getShortId}`

    let record = new Short(req.body);
    let savedRecord = await record.save();

    return res.status(200).send({
      message: "Short URL Created Successfully",
      shortUrl: `${req.headers.origin}/${savedRecord.short}`,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

// GET FULL URI USING SHORT ID
short.getUriByShortId = async function getUriByShortId(req, res) {
  try {
    if (!req.params.shortId)
      return res.status(500).send("Missing Required Fields");

    if (!shortid.isValid(req.params.shortId))
      return res.status(500).send("Not an valid ID");

    let record = await Short.findOne({ short: req.params.shortId });

    if (!record)
      return res.status(500).send("URL not exist for the given Short ID");

    return res.redirect(302, record.fullUrl);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
