import express from "express";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let task = [];
let workItems = [];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { Title: day, newTask: task });
});
app.post("/", function (req, res) {
  let item = req.body.task;

  console.log(req.body);

  if (req.body.btn === "Work") {
    workItems.push(req.body.task);
    res.redirect("/work");
  } else {
    task.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { Title: "Work", newTask: workItems });
});
app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
