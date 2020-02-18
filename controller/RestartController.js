const { exec } = require("child_process");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
}


exports.restartCMD = function (){
    const { stdout, stderr } = await exec('npm start');
    console.log('restart');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  };