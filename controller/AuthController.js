var config = require('../config/config');
var authService = require('../service/auth.service')
const IUser = require('../domain/IUser');
const validation = require('../util/validation');


exports.loginOracle = function (req, res) {
  try {
      let jwt = require('jsonwebtoken');
      let userid = req.body.username;
      let user_pwd = req.body.password;
      let userData;

      let payload = {
          userid: userid,
          user_pwd: user_pwd
      };

      authService.getUser(req, res).then(reslt => {
          console.log("result getUser: ", reslt);

          if (!validation.isEmptyStr(reslt)) {
              let token = jwt.sign(payload, config.secret, {
                  expiresIn: config.jwtExpiresIn
              });

              let resdata = reslt[0];
              console.log("OK password");
              userData = new IUser(resdata, true, token);

              return res.status(200).json(userData);

          } else {
              userData = new IUser({});
              return res.status(400).json(userData);
          }
      });
  } catch (error) {
      console.log(error);
  }
};
