const {spawn} = require('child_process');

const initVoteCtrl = {};

initVoteCtrl.init = async(req,res) => {

  const py = spawn("python", ['server/scripts_python/backendInit.py',"3","3"]);

  const result = await new Promise((resolve,reject) => {
    let output;

    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured :${data}`);
      reject(`Error occured in backendInit.py`);
    });
 
    py.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(output);
    });
  });

  //ici je renvoie le résultat vers le client mais en vrai faudrait envoyer ca sur la bdd

  res.json(result);

}

module.exports = initVoteCtrl;