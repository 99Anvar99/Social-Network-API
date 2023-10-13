const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Get a user by their id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Update a user by their id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Add a friend to a user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Remove a friend from a user
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },
};

module.exports = userController;
