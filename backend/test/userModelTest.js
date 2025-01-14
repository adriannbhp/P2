const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const User = require("../model/user"); // Sesesuaikan path ke model User Anda

describe('User model test', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      done();
    });
  });

  it('should create and save user successfully', async () => {
    const userData = { username: 'testuser', password: 'password' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).to.not.be.null;
    expect(savedUser.username).to.equal(userData.username);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
