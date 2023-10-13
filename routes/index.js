const router = require("express").Router();
const apiRoutes = require("./api");

// Mount API routes under the "/api" path
router.use("/api", apiRoutes);

// Handle requests for undefined routes with a 404 response
router.use((req, res) => {
  res.status(404).send("<h1>404 Error!</h1>");
});

module.exports = router;
