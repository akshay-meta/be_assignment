"use strict";

/**
 * Module dependencies
 */

require("dotenv").config();

const cluster = require("cluster");
const os = require("os");

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const models = join(__dirname, "app/models");
const port = process.env.PORT || 3000;

const app = express();
const connection = connect();
const router = require("./config/router");

/**
 * Expose
 */

module.exports = {
  app,
  connection,
};

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.indexOf(".js"))
  .forEach((file) => require(join(models, file)));

// Bootstrap routes
require("./config/express")(app);
app.use("/", router);

connection
  .on("error", console.log)
  .on("disconnected", connect)
  .once("open", listen);

function listen() {
  if (app.get("env") === "test") return;

  if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);
    const numCPUs = os.cpus();

    // Fork workers.
    for (let i = 0; i < numCPUs.length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(port);
    console.log("Express app started on port " + port);
  }
}

function connect() {
  var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}
