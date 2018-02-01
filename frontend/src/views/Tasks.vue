<template>
  <div class="container tasks">
    <div class="row">
      <div class="col-md-12 center">
        <h1>My Tasks</h1>
        <div id="loading" class="green"><h3>Loading...</h3></div>
      </div>
    </div>
    <div class="row">
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
          <div class="nobtn"></div>
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


        <div class="load-more">
          <div class="row">
            <div class="col-12 text-center">
              <a class="btn btn-white" v-on:click="checkDisputes">Load</a>
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
  methods:
  {
    getState: function()
    {
      var me = this;
      Api.getState({}, function(state)
      {
        me.state = state.state;
        
        Api.getTasks(me.state, function(data)
        {
          me.data = data.data;
          me.loaded = true;
        });
      });
    },
    getTasks: function()
    {
      var me = this;
      Api.getTasks({}, function(data)
      {
        me.data = data.data;
      });
    },
    checkDisputes: function()
    {
      var me = this;    
      Api.checkDisputes(me.state, function(data)
      {
        me.data = data.data;
        me.disputesLoaded = true;
      });
    },
    finalizeTask: function(id)
    {
      var me = this;
      Api.finalizeTask({id: id}, function(val)
      {
        
      });
    }
  },
  watch:
  {
    disputesLoaded: function()
    {
      var me = this;
    },
    loaded: function()
    {
      var me = this;
      document.getElementById('loading').style.visibility = 'hidden';
    }
  },
  
  computed:
  {

  }
}
</script>
