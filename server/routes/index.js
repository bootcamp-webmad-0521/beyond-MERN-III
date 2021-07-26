module.exports = app => {
    app.use("/api/coasters", require("./coasters.routes"))
    app.use("/api/upload", require("./uploads.routes"))
    app.use("/api", require("./auth.routes.js"))
}