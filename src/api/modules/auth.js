import User from "../resources/user/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

export const signIn = (req, res, next) => {
    const _token = signToken(req.user.id);
    res.status(200).json({ status: true, token: _token });
};

export const checkToken = (req, res, next) => {
    const _token = req.headers.authorization.split(" ")[1];

    if (!_token) {
        next(new Error("No token found"));
    }

    const decoded = jwt.verify(_token, config.secrets.jwt.jwtSecret);

    User.findOne({ _id: decoded.id }).then((user) => {
        if (!user) {
            res.status(401).json({
                status: false,
                message: "User does not exist",
            });
        } else {
            req.user = user;
            next();
        }
    });
};

export const verifyUser = () => (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        next(new Error("You need a username and a password"));
        return;
    }

    User.findOne({ username: username }).then((user) => {
        if (!user) {
            res.status(401).json({
                status: false,
                message: "No user with the given username",
            });
        } else {
            if (!user.authenticate(password)) {
                res.status(401).json({
                    status: false,
                    message: "Incorrect password",
                });
            } else {
                req.user = user;
                next();
            }
        }
    });
};

export const getFreshUser = () => (req, res, next) => {
    return User.findById(req.user.id)
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    status: false,
                    message: "Unauthorized",
                });
            } else {
                req.user = user;
                next();
            }
        })
        .catch((error) => next(error));
};

export const decodeToken = () => (req, res, next) => {
    if (config.disableAuth) {
        return next();
    }

    if (req.query && req.query.hasOwnProperty("access_token")) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
    }

    checkToken(req, res, next);
};

export const signToken = (id) => {
    return jwt.sign(
        { id },
        config.secrets.jwt.jwtSecret,
        config.secrets.jwtExpires
    );
};

export const protect = [decodeToken(), getFreshUser()];
