const { Schema, model, Types } = require('mongoose');
const { Thought } = require('../models');

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (input) {
          return emailRegex.test(input);
        },
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get total count of friends
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// tried to make this work but had no luck. The logic is now contained in user-controller.js

// UserSchema.post('findOneAndDelete', (user) => {
//   console.log(user);
//   Thought.deleteMany({ username: user.username });
// });

const User = model('User', UserSchema);

module.exports = User;
