<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Task Detail</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block">
          <div class="upper">
            <div class="row">
              <div class="col-8"><h2>{{item.title}}</h2></div>
              <div class="col-4 text-right">
                <div class="deadline">
                  {{item.price}}<span class="ctf">ctf</span>
                </div>
              </div>
            </div>
          </div>
          <div class="desc-container">
            <div class="row">
              <div class="col-md-8">
                <label>Task description</label>
                <div class="desc">
                  {{item.description}}
                </div>
                <div class="row" v-if="item.stage == 0">
                  <div class="col-md-12 text-center">
                    <div v-if="formApplyResponse.notice" class="alert alert-danger" role="alert">{{formApplyResponse.notice}}</div>
                    <div v-if="!formApplyResponse.error" class="alert alert-success" role="alert">Success</div>
                    <a v-if="formApplyResponse.error" class="btn btn-blue" v-on:click="applyForJob">Apply</a>
                  </div>
                </div>
                <div class="row" v-if="item.stage == 1 && this.$route.params.submit=='yes'">
                  <div class="col-md-12" v-if="formResponse.error == true">
                    <form>
                      <div class="form-group">
                        <label>Solution description</label>
                        <textarea class="form-control" v-model="formData.solution"></textarea>
                      </div>
                      <div v-if="formResponse.notice" class="alert alert-danger" role="alert">{{formResponse.notice}}</div>
                      <a class="btn btn-blue" v-on:click="submitSolution">Submit solution</a>
                    </form>
                  </div>
                  <div class="col-md-12">
                    <div v-if="!formResponse.error" class="alert alert-success" role="alert">Success</div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 seccol">
                <!-- div class="secondary">
                  <label>Posted</label>
                  {{calculateDays(item.timestamp)}}
                </div -->
                <div class="secondary">
                  <label>Worktime</label>
                  {{item.worktime}} day(s)
                </div>
                <div class="secondary">
                  <label>Status</label>
                  <span v-bind:class="item.status">{{item.status}}</span>
                </div>
                <div class="secondary">
                  <label>Worktime left</label>
                  <div class="deadline">
                    {{calculateRemainingDays(item)}}
                  </div>
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
      //console.log(me.formData);
      Api.submitSolution(me, {id: me.$route.params.id, data: me.formData}, function(val)
      {
        //if(val.error == false) me.formData.solution = '';
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
