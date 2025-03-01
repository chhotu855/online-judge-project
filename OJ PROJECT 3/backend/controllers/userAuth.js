const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { secure: true, sameSite: "None", maxAge: 3600000 });
        res.json({ token, role: user.role }); 
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
};

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send("Error registering user");
    }
};
exports.logout = (req, res) => {
    res.clearCookie("token"); 
    res.clearCookie("role"); 
    res.status(200).json({ message: "Logout successful" });
};