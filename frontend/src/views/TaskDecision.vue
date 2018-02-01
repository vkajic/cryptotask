<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Task Decision</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="col-title text-center">
          <h3>My posted tasks</h3>
        </div>
        <div class="block">
          <div class="upper">
            <div class="row">
              <div class="col-8"><h2>Website Design</h2></div>
              <div class="col-4 text-right">
                <div class="deadline">
                  {{item.price}}<span class="ctf">ctf</span>
                </div>
              </div>
            </div>
            <!-- div class="row secondary">
              <div class="col-3">
                <label>Posted</label>
                2 days ago
              </div>
              <div class="col-6">
                <label>Cryptotasker</label>
                15aKO90pPYIO562H7hs
              </div>
              <div class="col-3">
                <label>Time left for decision</label>
                3 days
              </div>
            </div -->
          </div>
          <div class="desc-container">
            <div class="row">
              <div class="col-12">
                <label>TASK DESCRIPTION</label>
                {{item.description}}
                </div>
            </div>
          </div>
          <div class="desc-container">
            <div class="row">
              <div class="col-12">
                <label>Solution description</label>
                {{item.solution}}
              </div>
            </div>
          </div>
          <div class="buttons">
            <div class="row">
              <div class="col-6">
                <a class="btn btn-primary" v-if="item.stage == 2" v-on:click="finalizeTask">Accept solution</a>
                <a class="btn btn-primary" v-if="item.stage == 4 && !item.reveal" v-on:click="voteYes">Satisfactory</a>
              </div>
              <div class="col-6">
                <a class="btn btn-red" v-if="item.stage == 2" v-on:click="startDispute">Start dispute</a>
                <a class="btn btn-red" v-if="item.stage == 4 && !item.reveal" v-on:click="voteNo">Not satisfactory</a>
              </div>
              <div class="col-12" v-if="item.stage == 3 && item.canCommitDispute">
                <a class="btn btn-primary" v-on:click="commitDispute">Commit dispute</a>
              </div>
              <div class="col-12" v-if="item.stage == 4 && item.reveal">
                <a class="btn btn-primary" v-on:click="revealVote">Reveal vote</a>
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
  name: 'TaskDecision',
  data: function()
  {
    return {
      item: {}
    }
  },
  created: function()
  {
    var me = this;
    me.getTask()
  },
  methods:
  {
    back: function()
    {
      window.history.back();
    },
    getTask: function()
    {
      var me = this;
      Api.getTask({id: me.$route.params.id}, function(data)
      {
        me.item = data;
      });
    },
    finalizeTask: function()
    {
      var me = this;
      Api.finalizeTask({id: me.$route.params.id}, function(val)
      {
        
      });
    },
    startDispute: function()
    {
      var me = this;
      Api.startDispute({id: me.$route.params.id}, function(val)
      {
        
      });
    },
    commitDispute: function()
    {
      var me = this;
      Api.commitDispute({id: me.$route.params.id}, function(val)
      {
        
      });
    },
    voteYes: function()
    {
      var me = this;
      Api.vote({id: me.$route.params.id, vote: 2}, function(val)
      {
        
      });
    },
    voteNo: function()
    {
      var me = this;
      Api.vote({id: me.$route.params.id, vote: 1}, function(val)
      {
        
      });
    },
    revealVote: function()
    {
      var me = this;
      Api.revealVote({id: me.$route.params.id}, function(val)
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
