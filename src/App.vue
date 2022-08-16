<template>
  <div class="app" ref="app">
      <router-view>
      </router-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import LeftBar from './views/LeftBar.vue';
import MidBar from './views/MidBar.vue';

</script>
<style lang="less"  >
body,html{
  height: 100%;
  width: 100%;
  margin: 0px;

}
#app{
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
}
.app{
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
}
/* ::-webkit-scrollbar{
  display: none;
} */
</style>
