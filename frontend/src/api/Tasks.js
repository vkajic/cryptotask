import data from '@/api/data.js'



var abi = require('ethereumjs-abi');
var BN = require('bn');
var Web3Utils = require('web3-utils');



/*var Web3 = require('web3');

var tc;
var ct;
var web3;

if(typeof window.web3 == "undefined" || typeof window.web3.currentProvider == "undefined") 
{
  web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));    
}

var tcAddress = "0x07503404046Fd1cDFa4E67ac8e9d1c49990C0Af0";
var ctAddress = "0x828Eaf42263948B181e9591B93E6DCC1f47c0999";

tc = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"lockOf","outputs":[{"name":"lock","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toLock","type":"address"},{"name":"_setTo","type":"bool"}],"name":"setLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);

ct = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MIN_TASK_VALUE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"titles","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"commitDispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"vote","type":"uint32"},{"name":"salt","type":"bytes32"}],"name":"revealVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"migrating","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CLIENT_TIME_TO_DECIDE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastStakings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"index","type":"uint32"}],"name":"getVote","outputs":[{"name":"vote","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minTaskValue","type":"uint256"}],"name":"setMinTaskValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ADs","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tasksSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"finalizeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tasks","outputs":[{"name":"client","type":"address"},{"name":"fl","type":"address"},{"name":"taskValue","type":"uint256"},{"name":"workTime","type":"uint256"},{"name":"applyTime","type":"uint256"},{"name":"solutionSubmittedTime","type":"uint256"},{"name":"disputeStartedTime","type":"uint256"},{"name":"blockHash","type":"bytes32"},{"name":"votesTotal","type":"uint32"},{"name":"votesClient","type":"uint32"},{"name":"votesFl","type":"uint32"},{"name":"stage","type":"uint32"},{"name":"prev","type":"uint256"},{"name":"next","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"voteHash","type":"bytes32"}],"name":"commitVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"commiter","type":"address"}],"name":"getVoteCommit","outputs":[{"name":"commit","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VOTING_PERIOD","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"solutions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"disputeBlockNos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"startDispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"taskValue","type":"uint256"},{"name":"workTime","type":"uint256"}],"name":"postTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"solution","type":"string"}],"name":"submitSolution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTaskIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"applyForTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"descriptions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"addStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"willMigrate","type":"bool"}],"name":"setMigrating","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"},{"name":"recipient","type":"address"}],"name":"addStakeAD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"index","type":"uint32"}],"name":"getVoter","outputs":[{"name":"voter","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]);
*/



/*var tcAddress = "0x4545750F39aF6Be4F237B6869D4EccA928Fd5A85";
var ctAddress = "0x7F6eAC2EA38284645795996b11F9Bf227cf9551d";*/

var tcAddress = "0x07503404046Fd1cDFa4E67ac8e9d1c49990C0Af0";
var ctAddress = "0x828Eaf42263948B181e9591B93E6DCC1f47c0999";

var tokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"lockOf","outputs":[{"name":"lock","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toLock","type":"address"},{"name":"_setTo","type":"bool"}],"name":"setLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
var tc = tokenContract.at(tcAddress);

var ctContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MIN_TASK_VALUE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"titles","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"commitDispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"vote","type":"uint32"},{"name":"salt","type":"bytes32"}],"name":"revealVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"migrating","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CLIENT_TIME_TO_DECIDE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastStakings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"index","type":"uint32"}],"name":"getVote","outputs":[{"name":"vote","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minTaskValue","type":"uint256"}],"name":"setMinTaskValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ADs","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tasksSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"finalizeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tasks","outputs":[{"name":"client","type":"address"},{"name":"fl","type":"address"},{"name":"taskValue","type":"uint256"},{"name":"workTime","type":"uint256"},{"name":"applyTime","type":"uint256"},{"name":"solutionSubmittedTime","type":"uint256"},{"name":"disputeStartedTime","type":"uint256"},{"name":"blockHash","type":"bytes32"},{"name":"votesTotal","type":"uint32"},{"name":"votesClient","type":"uint32"},{"name":"votesFl","type":"uint32"},{"name":"stage","type":"uint32"},{"name":"prev","type":"uint256"},{"name":"next","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"voteHash","type":"bytes32"}],"name":"commitVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"commiter","type":"address"}],"name":"getVoteCommit","outputs":[{"name":"commit","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VOTING_PERIOD","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"solutions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"disputeBlockNos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"startDispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"taskValue","type":"uint256"},{"name":"workTime","type":"uint256"}],"name":"postTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"},{"name":"solution","type":"string"}],"name":"submitSolution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTaskIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"taskID","type":"uint256"}],"name":"applyForTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"descriptions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"addStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"willMigrate","type":"bool"}],"name":"setMigrating","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"},{"name":"recipient","type":"address"}],"name":"addStakeAD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"taskID","type":"uint256"},{"name":"index","type":"uint32"}],"name":"getVoter","outputs":[{"name":"voter","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]);
var ct = ctContract.at(ctAddress);



var disputeCount = 0;


function taskLoop(i, params) {
  ct.titles(i, function(error, title) {
    data[i-1] = {};  
    data[i-1].id = i;
    data[i-1].title = title;
    
    ct.descriptions(i, function(error, description) {
      data[i-1].description = description;
      
      ct.solutions(i, function(error, solution) {
        data[i-1].solution = solution;
        
        ct.disputeBlockNos(i, function(error, disputeBlockNo) {
          data[i-1].disputeBlockNo = disputeBlockNo.toNumber();

          ct.tasks(i, function(error, task) {
            data[i-1].client = task[0];
            data[i-1].fl = task[1];
            data[i-1].stage = task[11].toNumber();
            data[i-1].disputeStartedTime = task[6].toNumber(); 
            data[i-1].hash = task[7];  
            data[i-1].worktime = Math.round(task[3].toNumber()/3600/24);
            data[i-1].price = parseInt(task[2].toNumber()/1000000000000000000);  
            data[i-1].applyTime = task[4].toNumber();
            data[i-1].solutionTime = task[5].toNumber(); 
            
            if(data[i-1].stage == 0) {
              data[i-1].status = "posted";
              data[i-1].viewCl = "";
              data[i-1].viewFl = "";
            } else if(data[i-1].stage == 1) {
              data[i-1].status = "cryptotasker applied";
              data[i-1].viewCl = "waiting";
              data[i-1].viewFl = "";
            } else if(data[i-1].stage == 2) {
              data[i-1].status = "has solution";
              data[i-1].viewCl = "waiting";
              data[i-1].viewFl = "waiting";
            } else if(data[i-1].stage == 3) {
              data[i-1].status = "dispute started";
              data[i-1].viewCl = "";
              data[i-1].viewFl = "";
            } else if(data[i-1].stage == 4) {
              data[i-1].status = "dispute commited";
              data[i-1].viewCl = "waiting";
              data[i-1].viewFl = "waiting";
            } else if(data[i-1].stage == 5) {
              data[i-1].status = "cancelled";
              data[i-1].viewCl = "gray";
              data[i-1].viewFl = "gray";
            } else if(data[i-1].stage == 6) {
              data[i-1].status = "accepted";
              data[i-1].viewCl = "finished";
              data[i-1].viewFl = "finished";
            } else if(data[i-1].stage == 7) {
              data[i-1].status = "client late";
              data[i-1].viewCl = "gray";
              data[i-1].viewFl = "gray";
            } else if(data[i-1].stage == 8) {
              data[i-1].status = "cryptotasker won";
              data[i-1].viewCl = "rejected";
              data[i-1].viewFl = "finished";
            } else if(data[i-1].stage == 9) {
              data[i-1].status = "cryptotasker late";
              data[i-1].viewCl = "gray";
              data[i-1].viewFl = "gray";
            } else if(data[i-1].stage == 10) {
              data[i-1].status = "client won";
              data[i-1].viewCl = "finished";
              data[i-1].viewFl = "rejected";
            }
            
            if(params.blockNo > data[i-1].disputeBlockNo + 5)
            {
              data[i-1].canCommitDispute = true;
            } 
            
            data[i-1].votingDone = false;
            if(data[i-1].disputeStartedTime > 0 && params.time > data[i-1].disputeStartedTime + 2*params.VOTING_PERIOD)
            {
              data[i-1].votingDone = true;
            } 
            
            data[i-1].solutionOver = false;
            if(data[i-1].applyTime > 0 && data[i-1].worktime > 0 && params.time > data[i-1].applyTime + data[i-1].worktime)
            {
              data[i-1].solutionOver = true;
            } 
            
            data[i-1].decisionOver = false;
            if(data[i-1].solutionTime > 0 && params.time > data[i-1].solutionTime + params.CLIENT_TIME_TO_DECIDE)
            {
              data[i-1].decisionOver = true;
            } 
          });
        }); 
      });   
    });
  });  
}

function disputeLoop(i, params, cb) {
  var item = data[i];
  
  if(item.stage == 4) {
    disputeCount++;

    web3.eth.sign(web3.eth.accounts[0], "0x" + abi.soliditySHA3( [ "uint", "bytes32" ], [ item.id, item.hash ]).toString('hex'), function(error, sig) {

      var sig = sig.substr(2, sig.length);
      var r = '0x' + sig.substr(0, 64);
      var s = '0x' + sig.substr(64, 64);
      var v = '0x' + sig.substr(128, 2);
      sig = '0x' + sig;
      
      localStorage.setItem('v'+(item.id).toString()+web3.eth.accounts[0], v);
      localStorage.setItem('r'+(item.id).toString()+web3.eth.accounts[0], r);
      localStorage.setItem('s'+(item.id).toString()+web3.eth.accounts[0], s);
      
      s = web3.toBigNumber(s);
      
      console.log(42949672950/s.mod(4294967296).toNumber());
      console.log(params.totalStake/params.myStake);
      
      if(42949672950/s.mod(4294967296).toNumber() > params.totalStake/params.myStake)
      {
        console.log("SELECTED!");     
         
        data[i].reviewing = true;         
        
        if(params.time - item.disputeStartedTime > params.VOTING_PERIOD)
        {
          data[i].reveal = true;
        }   
      }
      
      disputeCount--;
      if(disputeCount == 0)
      {
        cb({data: data});
      }
      
    });
    
  }
}



export default {
  getState(params, cb)
  { 
    var state = {myStake: 0, totalStake: 0, time: 0, blockNo: 0, VOTING_PERIOD: 0, CLIENT_TIME_TO_DECIDE: 0, myAddress: 0};
    
    setTimeout(function() { 
      ct.stakes(web3.eth.accounts[0], function(error, myStake) {
        state.myStake = parseInt(myStake.toNumber()/1000000000000000000);
      
        ct.totalStake(function(error, totalStake) {
          state.totalStake = parseInt(totalStake.toNumber()/1000000000000000000);
          
          web3.eth.getBlock('latest', function(error, block) {
            state.time = block.timestamp;
            state.blockNo = block.number;
            
            ct.VOTING_PERIOD(function(error, VOTING_PERIOD) {
              state.VOTING_PERIOD = VOTING_PERIOD.toNumber();
              
              ct.CLIENT_TIME_TO_DECIDE(function(error, CLIENT_TIME_TO_DECIDE) {
                state.CLIENT_TIME_TO_DECIDE = CLIENT_TIME_TO_DECIDE.toNumber();
              
                state.myAddress = web3.eth.accounts[0];
  
                cb({state: state});
              });
              
            });
          });
        });
      });  
    }, 1000);
      
  },
  getTasks(params, cb)
  { 
    ct.tasksSize(function (error, tasksSize) {
      for(var i=1; i <= tasksSize; i++) {  
        taskLoop(i, params);
      }
    });
  
    
    setTimeout(function() { 
      cb({data: data});
    }, 2000); 
    
  },
  getTask(params, cb)
  {
    for(var i=0;i<data.length;i++)
    {
      var item = data[i];
      if(item.id == params.id)
      {
        cb(item);
        return;
      }
    }
  },
  checkDisputes(params, cb)
  {  
    disputeCount = 0;
     
    for(var i=0;i<data.length;i++)
    {
      disputeLoop(i, params, cb);
    }

  },
  submitSolution: function(params, cb)
  {     
    ct.submitSolution(params.id, params.data.solution, function(error) {} ); 
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  applyForJob: function(params, cb)
  {
    ct.applyForTask(params.id, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  submitJob: function(params, cb)
  {      
    var price = params.price + "000000000000000000";  //to wei
    var worktime = params.worktime*86400;  //to seconds
    ct.postTask(params.title, params.description, price, worktime, function(error) {} ); 
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  finalizeTask: function(params, cb)
  {
    ct.finalizeTask(params.id, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  startDispute: function(params, cb)
  {
    ct.startDispute(params.id, function(error) {});
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  commitDispute: function(params, cb)
  {
    ct.commitDispute(params.id, function(error) {}); 
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  increaseAllowance: function(params, cb)
  {          
    tc.increaseApproval(ctAddress, params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  decreaseAllowance: function(params, cb)
  {          
    tc.decreaseApproval(ctAddress, params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  addStake: function(params, cb)
  {          
    ct.addStake(params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  withdrawStake: function(params, cb)
  {          
    ct.withdrawStake(params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  vote: function(params, cb)
  {          
    var salt = Web3Utils.randomHex(500).substr(0, 66);
    localStorage.setItem('salt'+(params.id).toString()+web3.eth.accounts[0], salt);
    localStorage.setItem('vote'+(params.id).toString()+web3.eth.accounts[0], params.vote);
    ct.commitVote(params.id, "0x" + abi.soliditySHA3( [ "bytes32", "uint32" ], [ salt, params.vote ]).toString('hex'), function(error) {} );
    
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  revealVote: function(params, cb)
  {   
console.log(params.id);  
    var v = localStorage.getItem("v"+(params.id).toString()+web3.eth.accounts[0]);
    var r = localStorage.getItem("r"+(params.id).toString()+web3.eth.accounts[0]);
    var s = localStorage.getItem("s"+(params.id).toString()+web3.eth.accounts[0]);
    var vote = localStorage.getItem("vote"+(params.id).toString()+web3.eth.accounts[0]);         
    var salt = localStorage.getItem("salt"+(params.id).toString()+web3.eth.accounts[0]);
console.log(v); 
console.log(r); 
console.log(s); 
console.log(vote); 
console.log(salt);  
    ct.revealVote(params.id, v, r, s, vote, salt, function(error) {} );
    
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  }
}
