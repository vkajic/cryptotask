<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <a v-on:click="back"><img src="../assets/img/back.svg"> <span class="back">Back</span></a>
      </div>
      <div class="col-md-8 center">
        <h1>Find work</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="col-title text-center">
          <h3 class="blue">Project list</h3>
        </div>
        <div class="col-filter">
          <h3 class="blue"><span class="gray italic">Sort by</span> <span class="item active">Time Posted <img src="../assets/img/up.svg"></span> <span class="item">Value</span> <span class="item">Work time</span></h3>
        </div>
        <div v-for="item in data" v-bind:class="item.status" class="block">
          <div class="upper">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div class="col-12">
                    <h2>{{item.title}}</h2>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <!-- label>Posted</label>
                    {{calculateDays(item.timestamp)}} -->
                  </div>
                  <div class="col-6">
                    <label>Worktime</label>
                    {{item.worktime}} day(s)
                  </div>
                </div>
              </div>
              <div class="col-md-3 text-right">
                <div class="deadline">
                  {{item.price}}<span class="ctf">ctf</span>
                </div>
              </div>
            </div>
          </div>
          <div class="desc-container">
            <div class="row">
              <div class="col-md-9">
                {{item.description}}
              </div>
              <div class="col-md-3">
                <router-link class="btn btn-blue" v-if="item.stage == 0" :to="'taskdetail/'+item.id+'/no'">View details / apply</router-link>
                <router-link class="btn btn-white" v-if="item.stage != 0" :to="'taskdetail/'+item.id+'/no'">View details</router-link>
              </div>
            </div>
          </div>
          <div class="row" v-if="item.status != 'pending'">
            <div class="col-md-4">
              <div class="deadline small">
                <{{fcupper(item.status)}}>
              </div>
            </div>
          </div>
        </div>
        <!-- div class="load-more">
          <div class="row">
            <div class="col-12 text-center">
              <a class="btn btn-white" v-on:click="loadMore = true">Load more</a>
            </div>
          </div>
        </div -->
      </div>
    </div>
  </div>
</template>

<script>

import Api from '@/api/FindWork'

export default {
  name: 'Tasks',
  data: function()
  {
    return {
      data: {},
      loadMore: false
    }
  },
  created: function()
  {
    var me = this;
    me.getWork();
  },
  methods:
  {
    back: function()
    {
      window.history.back();
    },
    getWork: function()
    {
      var me = this;
      Api.getWork(me, {loadMore: me.loadMore}, function(data)
      {
        me.data = data.data;
      });
    }
  },
  watch:
  {
    loadMore: function()
    {
      var me = this;
      me.getWork();
    }
  },
  computed:
  {

  }
}
</script>
