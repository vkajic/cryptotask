<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-md-3 text-md-left text-lg-left text-xl-left text-center">
          <div class="logo">
            <!-- router-link :to="{ name: '/', params: {} }"><img src="../assets/img/logo.svg"></router-link -->
            <a v-on:click="back"><span class="back"><img src="../assets/img/logo.svg"></span></a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="header-data text-md-right text-lg-right text-xl-right text-center">
            <p><span>Wallet: {{balance}} CTF</span><span class="normal"> ⎜ </span><span>Allowance: {{allowance}} CTF</span>  <router-link :to="'funds/'+'allowanceInc'">Increase</router-link>
            / <router-link :to="'funds/'+'allowanceDec'">Decrease</router-link>
            <span class="normal"> ⎜ </span><span>Stake: {{myStake}} CTF</span>  <router-link :to="'funds/'+'stakeAdd'">Add</router-link> / <router-link :to="'funds/'+'stakeWithdraw'">Withdraw</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>

import Api from '@/api/Globals'

export default
{
	name: 'header',
  data: function()
  {
    return {
      balance: 0,
      allowance: 0,
      myStake: 0,
      totalStake: 0                  
    };
  },
  created: function()
  {
    var me = this;
    me.getInitialData();
  },
  methods:
  {
    getInitialData: function()
    {
      var me = this;
      Api.getInitialData({}, function(data)
      {
        me.balance = data.balance;
        me.allowance = data.allowance;
        me.myStake = data.myStake;
        me.totalStake = data.totalStake;  
        //console.log(data);                              
      });  
    },
    back: function()
    {
      //window.history.back();
      
      //window.location = "/";
      window.location = "/platformtest/index.html";
           
      //location.reload();            
    }
  }
}
</script>
