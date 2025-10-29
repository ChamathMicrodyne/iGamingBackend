import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { isAdmin } from "./adminControllers.js";

dotenv.config();

export async function createUsers(req, res) {
  // Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  // Find the user with the highest id
  const lastUser = await User.findOne().sort({ id: -1 });
  const newId = lastUser && lastUser.id ? lastUser.id + 1 : 1;

  // Check if username already exists
  const existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username is already entered" });
  }

  // Check if email already exists
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is already entered" });
  }

  // Check if full phone number already exists
  const existingNumber = await User.findOne({ number: req.body.number });
  if (existingNumber) {
    return res.status(400).json({ message: "Phone number is already entered" });
  }

  // Check if NIC already exists
  const existingNic = await User.findOne({ nic: req.body.nic });
  if (existingNic) {
    return res.status(400).json({ message: "NIC is already entered" });
  }

  // Validate NIC (Sri Lankan format)
  if (!validateNIC(req.body.nic)) {
    return res.status(400).json({
      message:
        "Invalid NIC: Must be 10 characters (9 digits + V/X) or 12 digits",
    });
  }

  const user = new User({
    id: newId,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    numbercode: req.body.numbercode,
    number: req.body.number,
    birthday: req.body.birthday,
    countrycode: req.body.countrycode,
    currency: req.body.currency,
    zipcode: req.body.zipcode,
    nic: req.body.nic,
  });

  user
    .save()
    .then(() => {
      res.json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to create user",
        error: err,
      });
    });
}

export async function getUsers(req, res) {
  try {
    if (isAdmin(req)) {
      const user = await User.find();
      res.json(user);
    } else {
      res.json({
        message: "Your not authorized",
      });
    }
  } catch (err) {
    res.json({
      message: "Failed to retrieve users",
      error: err,
    });
  }
}

export function loginUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      if (!user.active) {
        return res.status(403).json({
          message: "User account is deactivated",
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            numbercode: user.numbercode,
            number: user.number,
            birthday: user.birthday,
            countrycode: user.countrycode,
            currency: user.currency,
            zipcode: user.zipcode,
            nic: user.nic,
            emailverified: user.emailverified,
            numberverified: user.numberverified,
            active: user.active,
            exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // Expire in 12 hours
          },
          process.env.JWT_KEY
        );

        res.status(200).json({
          message: "Login successfull",
          token: token,
        });
      } else {
        res.status(404).json({
          message: "wrong password",
        });
      }
    }
  });
}

export async function refreshBalance(req, res) {
  if (req.user === null) {
    res.status(401).json({
      message: "User not found please login first",
    });
  }

  const user = await User.findOne({ username: req.user.username }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Refresh balance successfull",
        currency: user.currency,
        balance: user.balance,
        noncashbalance: user.noncashbalance,
      });
    }
  );
}

export async function updateBalance(req, res) {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "User not found, please login first",
    });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance = user.balance + Number(req.body.balance);
    user.noncashbalance = user.noncashbalance + Number(req.body.noncashbalance);

    // Save the updated user to the database
    await user.save();

    // Return the response
    res.status(200).json({
      message: "Balance update successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update balance",
      error: error.message,
    });
  }
}

export async function deleteUsers(req, res) {
  try {
    await User.deleteOne({ id: req.params.id });
    res.json({
      message: `User deleted successfully`,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete user",
      error: err,
    });
  }
}

export async function updateUsers(req, res) {
  const userId = req.params.id;
  const updateData = {};

  // Only include fields that are provided in req.body
  if (req.body.firstname) updateData.firstname = req.body.firstname;
  if (req.body.lastname) updateData.lastname = req.body.lastname;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.password)
    updateData.password = bcrypt.hashSync(req.body.password, 10);
  if (req.body.numbercode) updateData.numbercode = req.body.numbercode;
  if (req.body.number)
    updateData.number = req.body.numbercode + req.body.number;
  if (req.body.birthday) updateData.birthday = req.body.birthday;
  if (req.body.countrycode) updateData.countrycode = req.body.countrycode;
  if (req.body.currency) updateData.currency = req.body.currency;
  if (req.body.zipcode) updateData.zipcode = req.body.zipcode;
  if (req.body.nic) updateData.nic = req.body.nic;
  if (req.body.balance) updateData.balance = req.body.balance;
  if (req.body.noncashbalance)
    updateData.noncashbalance = req.body.noncashbalance;
  if (req.body.emailverified) updateData.emailverified = req.body.emailverified;
  if (req.body.numberverified)
    updateData.numberverified = req.body.numberverified;
  if (req.body.active) updateData.active = req.body.active;

  // Validate NIC if provided
  if (req.body.nic && !validateNIC(req.body.nic)) {
    return res.status(400).json({
      message: "Invalid NIC: Must be (9 digits + V/X) or 12 digits",
    });
  }

  // Check duplicates only for fields being updated
  if (req.body.email) {
    const existingEmail = await User.findOne({
      email: req.body.email,
      id: { $ne: userId },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already entered" });
    }
  }

  if (req.body.number) {
    if (req.body.number.length !== 9) {
      return res.status(400).json({
        message: "Phone number should be 9 digits",
        data: req.body.number,
      });
    }
    const existingNumber = await User.findOne({
      number: req.body.number,
      id: { $ne: userId },
    });
    if (existingNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is already entered" });
    }
  }

  if (req.body.nic) {
    const existingNic = await User.findOne({
      nic: req.body.nic,
      id: { $ne: userId },
    });
    if (existingNic) {
      return res.status(400).json({ message: "NIC is already entered" });
    }
  }

  try {
    const result = await User.updateOne({ id: userId }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

// NIC Validation Function (for Sri Lankan old and new formats)
function validateNIC(nic) {
  if (!nic || typeof nic !== "string") {
    return false;
  }

  // Old format: 9 digits + V/X (10 characters)
  if (nic.length === 10 && /^\d{9}[VvXx]$/.test(nic)) {
    return true;
  }

  // New format: 12 digits
  if (nic.length === 12 && /^\d{12}$/.test(nic)) {
    return true;
  }

  return false;
}
