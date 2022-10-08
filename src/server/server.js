import express from "express";
import compression from "compression";
import helmet from "helmet";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import { App } from "../App";

const app = express();

app.use("/static", express.static("./dist/client"));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.get("*", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
