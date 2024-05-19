const {spawn} = require('child_process');
const mongoose = require("mongoose");

const PublicKey = require('../modeles/PubkeyModel');
const Ci = require("../modeles/CiModel");

const combineCtrl = {};

combineCtrl.compute = async(req,res) => {
    const {candidat, ci} = req.body;

    const pubkey = await PublicKey.find();

    const n = pubkey[0].n;
    const delta = pubkey[0].delta;
    const teta = pubkey[0].teta;
    const nb_serv = pubkey[0].nb_serv;

    let args = [];

    args.push('server/scripts_python/backendCombine.py');
    args.push(nb_serv);
    args.push(delta);
    args.push(teta);
    args.push(n);
    console.log("voici les ci :");

    for (let i = 0; i < ci.length; i++) {
        args.push(ci[i]);
        console.log(ci[i]);
    };

    const py = spawn("python", args);

    const result = await new Promise((resolve,reject) => {
        let output;

        py.stdout.on("data", (data) => {
        output = JSON.parse(data);
        });

        py.stderr.on("data", (data) => {
        console.error(`[python] Error occured :${data}`);
        reject(`Error occured in backendCombine.py`);
        });
    
        py.on("exit", (code) => {
        console.log(`child process exited with code ${code}`);
        resolve(output);
        });
    });
    
    res.json(result.m);
}

module.exports = combineCtrl;