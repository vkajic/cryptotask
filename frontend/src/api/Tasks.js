var Web3Utils = require('web3-utils');
var abi = require('ethereumjs-abi');
var disputeCount = 0;
import data from '@/api/data.js'

function taskLoop(Vue, i, params) {

  return new Promise((resolve, reject) =>
  {
    Vue.$ct.titles(i, function(error, title) {
      data[i-1] = {};
      data[i-1].id = i;
      data[i-1].title = title;

      Vue.$ct.descriptions(i, function(error, description) {
        data[i-1].description = description;

        Vue.$ct.solutions(i, function(error, solution) {
          data[i-1].solution = solution;

          Vue.$ct.disputeBlockNos(i, function(error, disputeBlockNo) {
            data[i-1].disputeBlockNo = disputeBlockNo.toNumber();

            Vue.$ct.tasks(i, function(error, task) {
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

              resolve('ok');
            });
          });
        });
      });
    });
  })

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
  getState(Vue, params, cb)
  {
    var state = {myStake: 0, totalStake: 0, time: 0, blockNo: 0, VOTING_PERIOD: 0, CLIENT_TIME_TO_DECIDE: 0, myAddress: 0};

    setTimeout(function() {
      Vue.$ct.stakes(web3.eth.accounts[0], function(error, myStake) {
        state.myStake = parseInt(myStake.toNumber()/1000000000000000000);

        Vue.$ct.totalStake(function(error, totalStake) {
          state.totalStake = parseInt(totalStake.toNumber()/1000000000000000000);

          web3.eth.getBlock('latest', function(error, block) {
            state.time = block.timestamp;
            state.blockNo = block.number;

            Vue.$ct.VOTING_PERIOD(function(error, VOTING_PERIOD) {
              state.VOTING_PERIOD = VOTING_PERIOD.toNumber();

              Vue.$ct.CLIENT_TIME_TO_DECIDE(function(error, CLIENT_TIME_TO_DECIDE) {
                state.CLIENT_TIME_TO_DECIDE = CLIENT_TIME_TO_DECIDE.toNumber();

                state.myAddress = web3.eth.accounts[0];

                cb({state: state});
              });

            });
          });
        });
      });
    }, 600);

  },
  getTasks(Vue, params, cb)
  {
    Vue.$ct.tasksSize(function (error, tasksSize)
    {
      (async () =>
      {
        for(var i=1; i <= tasksSize; i++)
        {
          await taskLoop(Vue, i, params);
        }

        cb({data: data});
      })();
    });
  },
  getTask(Vue, params, cb)
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
  checkDisputes(Vue, params, cb)
  {
    disputeCount = 0;

    for(var i=0;i<data.length;i++)
    {
      disputeLoop(i, params, cb);
    }

  },
  submitSolution: function(Vue, params, cb)
  {
    Vue.$ct.submitSolution(params.id, params.data.solution, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  applyForJob: function(Vue, params, cb)
  {
    Vue.$ct.applyForTask(params.id, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  submitJob: function(Vue, params, cb)
  {
    var price = params.price + "000000000000000000";  //to wei
    var worktime = params.worktime*86400;  //to seconds
    Vue.$ct.postTask(params.title, params.description, price, worktime, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  finalizeTask: function(Vue, params, cb)
  {
    Vue.$ct.finalizeTask(params.id, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  startDispute: function(Vue, params, cb)
  {
    Vue.$ct.startDispute(params.id, function(error) {});
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  commitDispute: function(Vue, params, cb)
  {
    Vue.$ct.commitDispute(params.id, function(error) {});
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  increaseAllowance: function(Vue, params, cb)
  {
    Vue.$tc.increaseApproval(Vue.$ctAddress, params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  decreaseAllowance: function(Vue, params, cb)
  {
    Vue.$tc.decreaseApproval(Vue.$ctAddress, params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  addStake: function(Vue, params, cb)
  {
    Vue.$ct.addStake(params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  withdrawStake: function(Vue, params, cb)
  {
    Vue.$ct.withdrawStake(params.amount*1000000000000000000, function(error) {} );
    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  },
  vote: function(Vue, params, cb)
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
  revealVote: function(Vue, params, cb)
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
    Vue.$ct.revealVote(params.id, v, r, s, vote, salt, function(error) {} );

    //return error
    //cb({error: true, notice: 'something went wrong'});
    //return Success
    cb({error: false});
  }
}
