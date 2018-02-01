// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.less'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.mixin({
  methods:
	{
		calculateDays: function(timestamp)
		{
			var date = parseInt(timestamp)*1000;
			
      /*var now = new Date().getTime();
			var numDays = (now-date)/1000/3600/24;*/
      var numDays = (date)/1000/3600/24;
      
			/*if(Math.round(numDays) < 1) return 'Today';
			else if (Math.round(numDays) < 2) return '1 day ago';
			else return Math.round(numDays)+' days ago';*/
      
      return Math.round(numDays);
		},
    calculateRemainingDays: function(item)
		{
      /*var timestamp = item.timestamp;
      var worktime = item.worktime;
			var date = parseInt(timestamp)*1000;*/
			var now = new Date().getTime();
			/*var numDays = (now-date)/1000/3600/24;
			var num = Math.floor(numDays)-worktime; */
      
      var num = Math.round(item.worktime - (now/1000 - item.applyTime)/3600/24);

      if(num < 1) return '0 days';
			else return num+' days';
		},
		fcupper: function(text)
		{
			return text.charAt(0).toUpperCase() + text.slice(1);
		},
		back: function()
    {
      window.history.back();
    },
    disputePrice: function(price)
    {
      if(typeof price == 'undefined') return '';
      return Math.round(price/100*10);
    }
	}
})


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components:
	{
		App
	}
})
