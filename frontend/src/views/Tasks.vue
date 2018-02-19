<template>
  <div class="container tasks">
    <div v-if="!loaded" class="row">
      <div class="col-md-12 center mt-5">
        <div id="loading" class="green">

          <svg width="202px" height="230px" viewBox="0 0 202 230" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
    <title>Artboard 11</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="CRYPTO-TASK" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard-11" stroke-width="3">
            <polygon class="path" id="Fill-1" stroke="#3DA2DD" points="99.8195484 2 2 56.7852987 2 170.222614 62.3870968 207 62.3870968 182.757952 22.7580645 158.623713 22.7580645 68.886892 98.2419355 26.6112322 98.2419355 34.819155 98.2419355 67.4195573 118.370968 78.6354847 118.370968 172.719152 120.344242 172.719152 139.129032 161.935088 139.129032 90.2024191 158 100.716959 158 77.0183453 119 55.2885045 119 53.6976906 119 19.1529602 119 13.2002574"></polygon>
            <polygon class="path" id="Fill-3" stroke="#5ED170" points="137.394422 46.5789434 178.701841 69.2009179 178.701841 160.777438 100.755315 204.158992 99.314741 203.31132 99.314741 160.56878 59.2988048 137.610842 59.2988048 91.1192936 84.4701195 76.7833904 84.4701195 52.9690861 38 79.4357033 38 149.250962 77.3692271 171.837539 78.0159363 171.611493 78.0159363 172.2089 78.0159363 206.265442 78.0159363 214.803641 100.455841 228 200 172.597649 200 57.2850716 137.394422 23"></polygon>
        </g>
    </g>
</svg>
<h3>Loading...</h3>
        </div>
      </div>
    </div>
    <div v-if="loaded" class="row">
      <div class="col-md-12 center">
        <h1>My Tasks</h1>
      </div>
    </div>
    <div v-if="loaded" class="row">
      <div class="col-md-4">
        <div class="col-title text-center">
          <router-link class="btn btn-primary" :to="{ path: 'posttask', params: {} }">Post new job</router-link>
          <h3>My posted tasks</h3>
        </div>

        <div class="block" v-for="item in data" v-if="state.myAddress == item.client" v-bind:class="item.viewCl">
          <div class="upper">
            <div class="row">
              <div class="col-8">{{item.status}}
              </div>
              <div class="col-4 text-right">
                <img src="../assets/img/waiting_blue.svg" v-if="item.viewCl=='waiting'">
                <img src="../assets/img/accept.svg" v-if="item.viewCl=='finished'">
                <img src="../assets/img/remove.svg" v-if="item.viewCl=='rejected'">
              </div>
            </div>
          </div>
          <h2>{{item.title}}</h2>
          <div class="description">{{item.description}}
          </div>
          <div class="submition" v-if="item.status == 'waiting'">Cryptotasker has submitted solution
          </div>
          <!-- div class="time">{{calculateDays(item.timestamp)}}</div>
          <template v-id="typeof item.daysToDecide != 'undefined'">
            <div class="deadline">{{item.daysToDecide}} day(s)</div>
            <div class="deadlinedesc">
               to decide on this solution or you will <span>lose your 10%</span>
            </div>
          </template -->
          <div class="buttons">
            <div class="row">

              <div class="col-6">
                <div v-if="item.stage == 2 || item.stage == 3">
                  <!-- a class="btn btn-primary">Decide</a -->
                  <router-link class="btn btn-primary" :to="'taskdecision/'+item.id">Decide</router-link>
                </div>

                <div v-if="(item.stage == 4 && item.votingDone) || (item.stage == 1 && item.solutionOver)">
                  <!-- a class="btn btn-primary">Decide</a -->
                  <a class="btn btn-primary" v-on:click="finalizeTask(item.id)">Finalize</a>
                </div>

                <div v-if="item.stage == 0">
                  <!-- a class="btn btn-primary">Decide</a -->
                  <a class="btn btn-primary" v-on:click="finalizeTask(item.id)">Cancel</a>
                </div>
              </div>

              <div class="col-6">
                <!-- router-link class="a-link" :to="rules">Cryptotask rules</router-link -->
                <div class="deadline">
                  {{item.price}}<span class="ctf">CTF</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>





      <div class="col-md-4">
        <div class="col-title text-center">
          <router-link class="btn btn-blue" :to="{ path: 'findwork', params: {} }">Find job</router-link>
          <h3>Tasks I am working on</h3>
        </div>


        <div class="block" v-for="item in data" v-if="state.myAddress == item.fl" v-bind:class="item.viewFl">

          <div class="upper">
            <div class="row">
              <div class="col-8">{{item.status}}
              </div>
              <div class="col-4 text-right">
                <img src="../assets/img/waiting_blue.svg" v-if="item.viewFl=='waiting'">
                <img src="../assets/img/accept.svg" v-if="item.viewFl=='finished'">
                <img src="../assets/img/remove.svg" v-if="item.viewFl=='rejected'">
              </div>
            </div>
          </div>
          <h2>{{item.title}}</h2>
          <div class="description">
            {{item.description}}
          </div>
          <div v-if="item.stage == 1">
            <div class="deadline">
              {{calculateRemainingDays(item)}}
            </div>
            <div class="deadlinedesc">
               to finish this task or you will <span>lose your work fee</span>
            </div>
          </div>
          <div class="buttons">

            <div class="row">
              <div class="col-6">
                <div v-if="item.stage == 1">
                  <router-link class="btn btn-blue" :to="'taskdetail/'+item.id+'/yes'">Submit solution</router-link>
                </div>

                <div v-if="(item.stage == 4 && item.votingDone) || ((item.stage == 2 || item.stage == 3) && item.decisionOver)">
                  <!-- a class="btn btn-primary">Decide</a -->
                  <a class="btn btn-primary" v-on:click="finalizeTask(item.id)">Finalize</a>
                </div>
              </div>

              <div class="col-6">
                <!-- router-link class="a-link" :to="rules">Cryptotask rules</router-link -->
                <div class="deadline">
                  {{item.price}}<span class="ctf">CTF</span>
                </div>
              </div>

            </div>

          </div>

          <div class="deadlinedesc" v-if="item.stage == 2">
            Waiting for client decision
          </div>

        </div>

      </div>




      <div class="col-md-4">
        <div class="col-title text-center">
          <a class="btn btn-white" v-on:click="checkDisputes">Load</a>
          <h3>Tasks I am reviewing</h3>
        </div>

        <div v-for="item in data">

        <div class="block gray" v-if="disputesLoaded && item.reviewing">
          <div class="upper">
            <div class="row">
              <div class="col-12">Earn CTF’s if you vote with majority</div>
            </div>
          </div>
          <h2>{{item.title}}</h2>
          <div class="description">
            {{item.description}}
          </div>
          <!-- div class="submition">
            You have opportunity to review for
          </div>
          <div class="time">
            5 more days
          </div -->
          <div class="buttons">
            <div class="row">
              <div class="col-8">
                <router-link class="btn btn-white" :to="'taskdecision/'+item.id">Review it</router-link>
              </div>
            </div>
          </div>
        </div>

        </div>


      </div>
    </div>

    <b-modal v-bind:hide-footer="true" ref="helpmodal" title="Help">
      <p class="my-4">To use the platform you need to:</p>
      <p class="my-4">1) Be signed into Metamask and on ETH main-net</p>
      <p class="my-4">2) Have some CTF</p>
      <p class="my-4">3) Increase allowance at the top of the page (if posting task to at least task value + 10%, if applying for a task to at least 10% of task value). Minimum task value is 200 CTF</p>
      <p class="my-4">If you have further questions please contact us in our Telegram</p>
    </b-modal>
  </div>
</template>

<script>

import Api from '@/api/Tasks'

export default {
  name: 'Tasks',
  data: function()
  {
    return {

      data: {},
      state: {},
      loaded: false,
      disputesLoaded: false
    }
  },
  created: function()
  {
    var me = this;
    me.getState();
    //me.getTasks();
  },
  mounted: function()
  {
    var me = this;
    /*if(document.cookie.indexOf("noticeShown") == -1)
    {
      var d = new Date();
      d.setTime(d.getTime() + (7*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "noticeShown=true;" + expires + ";path=/";       */

      me.$refs.helpmodal.show();
    /*}*/
  },
  methods:
  {
    getState: function()
    {
      var me = this;
      Api.getState(me, {}, function(state)
      {
        me.state = state.state;

        Api.getTasks(me, me.state, function(data)
        {
          me.data = data.data;
          me.loaded = true;
        });
      });
    },
    getTasks: function()
    {
      var me = this;
      Api.getTasks(me, {}, function(data)
      {
        me.data = data.data;
      });
    },
    checkDisputes: function()
    {
      var me = this;
      Api.checkDisputes(me, me.state, function(data)
      {
        me.data = data.data;
        me.disputesLoaded = true;
      });
    },
    finalizeTask: function(id)
    {
      var me = this;
      Api.finalizeTask(me, {id: id}, function(val)
      {

      });
    }
  },
  watch:
  {
    disputesLoaded: function()
    {
      var me = this;
    }
  },

  computed:
  {

  }
}
</script>
