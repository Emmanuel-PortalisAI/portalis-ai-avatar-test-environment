const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Access your server at: http://localhost:${PORT}`)
);

app.get("/", (req, res) => res.send("Express on Vercel."));

module.exports = app;
