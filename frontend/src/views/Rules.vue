<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Cryptotasker rules</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block">
          <div class="desc-container">
            <div class="row">
              <div class="col-md-12">
                <label>Task description</label>
                <div class="desc">
                  {{item.description}}
                </div>
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
  name: 'TaskDetail',
  data: function()
  {
    return {
      item: {},
      formData:
      {
        solution: ''
      },
      formResponse:
      {
        error: true
      },
      formApplyResponse:
      {
        error: true
      }
    }
  },
  created: function()
  {
    var me = this;
    me.getTask()
  },
  methods:
  {
    getTask: function()
    {
      var me = this;
      Api.getTask(me, {id: me.$route.params.id}, function(data)
      {
        me.item = data;
      });
    },
    submitSolution: function()
    {
      var me = this;
      Api.submitSolution(me, {id: me.$route.params.id, data: me.formData}, function(val)
      {
        console.log(val)
        if(val.error == false) me.formData.solution = '';
        me.formResponse = val;
      });
    },
    applyForJob: function()
    {
      var me = this;
      Api.applyForJob(me, {id: me.$route.params.id}, function(val)
      {
        me.formApplyResponse = val;
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
