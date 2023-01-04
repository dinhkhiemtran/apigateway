require("dotenv").config();

exports.serverPort = 3000;
exports.sessionSecret = process.env.SESSION_SECRET;
exports.rate = {
  windowMs: 5 * 60 * 1000,
  max: 100,
};

const alwaysAllow = (_1, _2, next) => {
    next();
  };
  const protect = (req, res, next) => {
    const { authenticated } = req.session;
  
    if (!authenticated) {
      res.sendStatus(401);
    } else {
      next();
    }
  };

exports.proxies = {
  "/search": {
    protected: true,
    target: "http://api.duckduckgo.com/",
    changeOrigin: true,
    pathRewrite: {
      [`^/search`]: "",
    },
  },
};