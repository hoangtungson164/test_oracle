const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.restartCMD = async function (){
    const { stdout, stderr } = await exec('^C');
    console.log('restart 1');
    const { stdout, stderr } = await exec('npm start');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  };