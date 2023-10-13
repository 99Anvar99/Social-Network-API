const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Routes for working with users

// Get all users and create a new user
router.route("/users")
  .get(getAllUsers) // GET /api/users
  .post(createUser); // POST /api/users

// Get, update, or delete a specific user by their ID
router.route("/users/:id")
  .get(getUserById) // GET /api/users/:id
  .put(updateUser) // PUT /api/users/:id
  .delete(deleteUser); // DELETE /api/users/:id

// Routes for managing user friendships

// Add a friend to a user or remove a friend from a user
router.route("/users/:userId/friends/:friendId")
  .post(addFriend) // POST /api/users/:userId/friends/:friendId
  .delete(removeFriend); // DELETE /api/users/:userId/friends/:friendId

module.exports = router;
