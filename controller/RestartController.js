const { exec } = require("child_process");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.restartCMD = function (){
    const { stdout, stderr } = await exec('npm start');
    console.log('restart 2');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  };