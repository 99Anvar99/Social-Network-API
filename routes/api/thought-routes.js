const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Routes for working with thoughts

// Get all thoughts and create a new thought
router.route("/thoughts")
  .get(getAllThoughts) // GET /api/thoughts
  .post(createThought); // POST /api/thoughts

// Get, update, or delete a specific thought by its ID
router.route("/thoughts/:id")
  .get(getThoughtById) // GET /api/thoughts/:id
  .put(updateThought) // PUT /api/thoughts/:id
  .delete(deleteThought); // DELETE /api/thoughts/:id

// Routes for working with reactions

// Add a reaction to a specific thought
router.route("/thoughts/:thoughtId/reactions")
  .post(addReaction); // POST /api/thoughts/:thoughtId/reactions

// Remove a specific reaction from a specific thought
router.route("/thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // DELETE /api/thoughts/:thoughtId/reactions/:reactionId

module.exports = router;
