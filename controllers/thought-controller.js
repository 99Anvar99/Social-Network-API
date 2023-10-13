const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Get a thought by its id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Create a thought and associate it with a user
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Update a thought by its id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Delete a thought by its id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },
};

module.exports = thoughtController;
