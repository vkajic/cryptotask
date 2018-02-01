<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Set</h1>
      </div>
      <div class="col-md-2"></div>
    </div> 
        
    <div class="row">  
      <div class="col-md-12" v-if="type == 'allowanceInc' || type == 'allowanceDec'"> 
        <div class="block newtask">
            <form v-if="formResponse.error">

              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="secondary">
                    <label v-if="type == 'allowanceInc'">Increase allowance</label>
                    <label v-if="type == 'allowanceDec'">Decrease allowance</label>
                    <input type="text" class="form-control rounded-control dark" v-model="formData.amount" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <span class="disclaimer" v-if="type == 'allowanceInc'">* increase allowance</span>
                  <span class="disclaimer" v-if="type == 'allowanceDec'">* decrease allowance</span>
                </div>
              </div>
              <div class="row submitrow">
                <div class="col-md-12 text-center">
                  <div v-if="formResponse.notice" class="alert alert-danger" role="alert">{{formResponse.notice}}</div>
                  <a class="btn btn-primary" v-if="type == 'allowanceInc'" v-on:click="increaseAllowance">SET</a>
                  <a class="btn btn-primary" v-if="type == 'allowanceDec'" v-on:click="decreaseAllowance">SET</a>
                </div>
              </div>
            </form>
            <div class="row submitrow">
              <div class="col-md-12">
                <div v-if="!formResponse.error" class="alert alert-success" role="alert">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div> 

    
      <div class="col-md-12" v-if="type == 'stakeAdd' || type == 'stakeWithdraw'">
        <div class="block newtask">
            <form v-if="formResponse.error">
  
              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="secondary">
                    <label v-if="type == 'stakeAdd'">Add stake</label>
                    <label v-if="type == 'stakeWithdraw'">Withdraw stake</label>
                    <input type="text" class="form-control rounded-control dark" v-model="formData.amount" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <span class="disclaimer" v-if="type == 'stakeAdd'">* add stake</span>
                  <span class="disclaimer" v-if="type == 'stakeWithdraw'">* withdraw stake</span>
                </div>
              </div>
              <div class="row submitrow">
                <div class="col-md-12 text-center">
                  <div v-if="formResponse.notice" class="alert alert-danger" role="alert">{{formResponse.notice}}</div>
                  <a class="btn btn-primary" v-if="type == 'stakeAdd'" v-on:click="addStake">SET</a>
                  <a class="btn btn-primary" v-if="type == 'stakeWithdraw'" v-on:click="withdrawStake">SET</a>
                </div>
              </div>
            </form>
            <div class="row submitrow">
              <div class="col-md-12">
                <div v-if="!formResponse.error" class="alert alert-success" role="alert">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </div>
    
  </div>
</template>

<script>

import Api from '@/api/Tasks'

export default {
  name: 'Funds',
  data: function()
  {
    return {
      formData: {},
      formResponse:
      {
        error: true
      },
      type: ""
    }
  },
  created: function()
  {
    var me = this;
    me.type = me.$route.params.type;
    console.log(me.$route.params.type);
  },
  methods:
  {
    increaseAllowance: function()
    {
      var me = this;
      Api.increaseAllowance(me.formData, function(val)
      {
        
      });
    },
    decreaseAllowance: function()
    {
      var me = this;
      Api.decreaseAllowance(me.formData, function(val)
      {
        
      });
    },
    addStake: function()
    {
      var me = this;
      Api.addStake(me.formData, function(val)
      {
        
      });
    },
    withdrawStake: function()
    {
      var me = this;
      Api.withdrawStake(me.formData, function(val)
      {
        
      });
    }
  },
  watch:
  {

  },
  computed:
  {

  }
}
</script>
