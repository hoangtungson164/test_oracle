const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.restartCMD = async function (){
    console.log("something working");
    console.log("it's working");
    // const { stdout, stderr } = await exec('git pull');
    // console.log('restart 1');
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
    const { stdout2, stderr2 } = await exec('git pull');
    console.log(' ====================== pull and nodemon automatically run =================');
    console.log('stdout2:', stdout2);
    console.log('stderr2:', stderr2);
  };