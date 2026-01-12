const express = require("express");
const app = express();

app.use(express.json());

const annoncesRoutes = require("./routes/annonces.routes");
app.use("/annonces", annoncesRoutes);

app.listen(3000, () => {
  console.log("API backend lancée sur port 3000");
});
