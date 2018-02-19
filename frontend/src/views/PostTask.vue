<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Post task</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block newtask">
            <form v-if="formResponse.error">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>PROJECT TITLE</label>
                    <input type="text" class="form-control" v-model="formData.title"/>
                  </div>
                  <div class="form-group">
                    <label>PROJECT DESCRIPTION</label>
                    <textarea class="form-control" v-model="formData.description"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="secondary">
                    <label>Worktime left <span class="gray transformnone">| <span class="italic">time in number of days which you think the freelancer can finish your job)</span></span></label>
                    <div class="row">
                      <div class="col-md-4">
                        <input type="text" class="form-control rounded-control gray" v-model="formData.worktime" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  <div class="secondary">
                    <label>Task value</label>
                    <input type="text" class="form-control rounded-control dark" v-model="formData.price" />
                  </div>
                </div>
                <div class="col-2 text-center">
                  <div class="plus">+</div>
                </div>
                <div class="col-5">
                  <div class="secondary">
                    <label>10% dispute escrow * <span class="gray transformnone">| <span class="italic">generated automaticaly</span></span></label>
                    <div class="deadline small">
                      {{disputePrice(formData.price)}}<span class="ctf">ctf</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <span class="disclaimer">* 10% dispute escrow will be returned unless there was a dispute and you lost. It is NOT fee for our services.</span>
                </div>
              </div>
              <div class="row submitrow">
                <div class="col-md-12 text-center">
                  <div v-if="formResponse.notice" class="alert alert-danger" role="alert">{{formResponse.notice}}</div>
                  <a class="btn btn-primary" v-on:click="submitJob">Submit job</a>
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
  name: 'PostTask',
  data: function()
  {
    return {
      formData: {},
      formResponse:
      {
        error: true
      }
    }
  },
  created: function()
  {
    var me = this;
  },
  methods:
  {
    submitJob: function()
    {
      var me = this;
      Api.submitJob(me, me.formData, function(val)
      {
        me.formResponse = val;
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
