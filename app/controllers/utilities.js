const util = module.exports;
const { gzip, ungzip } = require("node-gzip");

util.gzipUrl = async function gzipUrl(url) {
  try {
    const compressed = await gzip(url);
    return compressed.toString("base64");
  } catch (error) {
    throw new Error(error);
  }
};

util.ungzipUrl = async function ungzipUrl(baseString) {
  try {
    const decompressed = await ungzip(Buffer.from(baseString, "base64"));
    return decompressed.toString();
  } catch (error) {
    throw new Error(error);
  }
};

util.isValidUrl = async function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
