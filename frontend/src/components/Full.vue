<template>
  <div>
    <header-view></header-view>
    <router-view></router-view>
    <footer-view></footer-view>
  </div>
</template>
<script>

import Footer from './Footer.vue'
import Header from './Header.vue'

export default
{
	name: 'Full',
  components:
  {
    'header-view': Header,
    'footer-view': Footer
  }
}
</script>
