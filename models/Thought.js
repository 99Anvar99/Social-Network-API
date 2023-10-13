const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Define the Reaction schema
const reactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId, // Mongoose's ObjectId data type
    default: Types.ObjectId, // Default value is set to a new ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to the current timestamp
    get: (timestamp) => dateFormat(timestamp), // Use a getter method to format the timestamp on query
  },
}, {
  toJSON: { getters: true },
  id: false,
});

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "Thought is Required",
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of nested documents created with the reactionSchema
}, {
  toJSON: { virtuals: true, getters: true },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
