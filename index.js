require("express-async-errors");
const morgan =  require('morgan')
const cors =  require('cors')
const express = require("express");
const res = require("express/lib/response");
const userRouter = require("./Routers/UserRouter");
const todosRouter = require("./Routers/todosRouter");

const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || "./";
const db = require("./DBConnection");
app.use(express.static(www));
console.log(`serving ${www}`);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(morgan('tiny'))
app.use("/users", userRouter);
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("*", (req, res) => {
//   res.sendFile(`index.html`, { root: www });
// });
// app.get("/data", (req, res) => {
//   res.send(`hellllllllllllll`, { root: www });
// });

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

//Global Error handler
//midle ware hav 4 paramter start with err
app.use((err, req, res, next) => {
  const statusCode = err.statuseCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "internal server error",
    errors: err?.errors || [],
  });
});

module.exports = db;
