var config = require('../config/config');
var authService = require('../service/auth.service')
const IUser = require('../domain/IUser');
const validation = require('../util/validation');


exports.loginOracle = function (req, res) {
  try {
      var jwt = require('jsonwebtoken');
      var userid = req.body.username;
      var user_pwd = req.body.password;

      var payload = {
          userid: userid,
          user_pwd: user_pwd
      };

      authService.getUser(req, res).then(reslt => {
          console.log("result getUser: ", reslt);

          if (!validation.isEmptyStr(reslt)) {
              var token = jwt.sign(payload, config.secret, {
                  expiresIn: config.jwtExpiresIn
              });

              var resdata = reslt[0];
              console.log("OK password");
              var userData = new IUser(resdata, true, token);

              return res.status(200).json(userData);

          } else {
              var userData = new IUser({});
              return res.status(400).json(userData);
          }
      });
  } catch (error) {
      console.log(error);
  }
};
