const { getUserByEmail, addUser } = require("../services/user");
const { compare, hash } = require("../utils/bcrypt");
const { sign } = require("../utils/jwt");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("invalid credentials");
    }

    const authenticated = await compare(password, user.password);

    if (!authenticated) {
      throw new Error("invalid credentials");
    }

    delete user.password;

    const token = sign(user);

    res.json({ ...user, token });
  } catch (error) {
    res.status(401);
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const hashedPassword = await hash(password);

    const user = await addUser(
      first_name,
      last_name,
      username,
      email,
      hashedPassword
    );

    delete user.password;

    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signin, signup };
