const Short = require("../models/short");
const shortid = require("shortid");
const util = require('./utilities');
const short = module.exports;

// Save Short URI
short.saveShortUrI = async function saveShortUrI(req, res) {
  try {

    if (!req.body.fullUrl)
      return res.status(404).send("Missing Required Fields");

    if (!await util.isValidUrl(req.body.fullUrl))
      return res.status(404).send("Invalid URI");

    // Allocate Unique Short ID
    shortid.worker(1);
    let getShortId = shortid.generate();
    req.body.short = getShortId,
    req.body.shortUrl = `${req.headers.origin}/${getShortId}`;

    // Gzip Long URL
    req.body.fullUrl = await util.gzipUrl(req.body.fullUrl);

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

    return res.redirect(302, await util.ungzipUrl(record.fullUrl));
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
