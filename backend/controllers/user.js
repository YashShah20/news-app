const UserService = require("../services/user");
const LocationService = require("../services/location");
const { compare, hash } = require("../utils/bcrypt");
const { sign } = require("../utils/jwt");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("invalid credentials");
    }

    const authenticated = await compare(password, user.password);

    if (!authenticated) {
      throw new Error("invalid credentials");
    }

    delete user.password;

    const ip = req.ip;
    const { city, country } = await LocationService.getLocationFromIP();

    const token = sign({ ...user, city, country });

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

    const user = await UserService.addUser(
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

const changePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { new_password } = req.body;

    const hashedPassword = await hash(new_password);
    UserService.updatePasswordById(id, hashedPassword);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { signin, signup, changePassword };
