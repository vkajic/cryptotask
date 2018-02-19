export default {
  getInitialData(Vue, params, cb)
  {
    var balance;
    var allowance;
    var myStake;
    var totalStake;

    setTimeout(function(){
      Vue.$tc.balanceOf(web3.eth.accounts[0], function(error, balance) {
        balance = parseInt(balance.toNumber()/1000000000000000000);

        Vue.$tc.allowance(web3.eth.accounts[0], Vue.$ctAddress, function(error, allowance) {
          allowance = parseInt(allowance.toNumber()/1000000000000000000);

          Vue.$ct.stakes(web3.eth.accounts[0], function(error, myStake) {
            myStake = parseInt(myStake.toNumber()/1000000000000000000);

            Vue.$ct.totalStake(function(error, totalStake) {
              totalStake = parseInt(totalStake.toNumber()/1000000000000000000);

              cb({
                /*cryptotaskerId: '08kLKio9OH9Iopo123009',
                taskNum: 1224,*/
                balance: balance,
                allowance: allowance,
                myStake: myStake,
                totalStake: totalStake
              });
            });
          });
        });
      });
    }, 400);
  }
}
