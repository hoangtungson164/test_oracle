const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.restartCMD = async function (){
    const { stdout, stderr } = await exec('ps aux | grep node');
    console.log('restart 1');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    const { stdout2, stderr2 } = await exec('node server.js');
    console.log('stdout2:', stdout2);
    console.log('stderr2:', stderr2);
  };