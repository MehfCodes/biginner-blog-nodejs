const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const { url } = require("./Config/DataBase");
const client = require("./routes/Client/client-routes");
const admin = require("./routes/Admin/admin-routes");
const category = require("./routes/Admin/category-routes");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const method = require("method-override");
const { selected } = require("./helper/selected");
const { postDate } = require("./helper/post-date");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

const public = path.join(__dirname, "public");
app.use(express.static(public));
mongoose
  .connect("mongodb://localhost:27017/CMS")
  .then((db) => console.log("connect to database ...."));
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "clientTemplate", helpers: { selected, postDate } })
);
app.set("view engine", "handlebars");
app.use(upload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(method("_method"));
app.use(
  session({
    secret: "node cms",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.seccess_msg = req.flash("seccess_msg");
  res.locals.delete_msg = req.flash("delete_msg");
  res.locals.edit_msg = req.flash("edit_msg");
  next();
});
app.use("/", client);
app.use("/admin", admin);
app.use("/admin/create-category", category);

const port = 4500;
app.listen(port, () => console.log(` app listening on port ${port}!`));
