<template>
  <div id="app">
    <div class="loading" IsLoading:IsLoading>
      <img class="loadImg" src="@/assets/下載中.png">
    </div>
    <div class="hidebg"></div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  components:{
    // hello:hello
  },
}
</script>
<style>
.loadImg{
    position: absolute;
    top: 40%;
    left: 48%;
    width: 100px;
}
.loading,
.hidebg{
  position: absolute;
  left: 0px;
  top: 0px;
  background-color:#000;
  width: 100%; 
  filter: alpha(opacity=60);
  opacity: 0.4;
  display: none;
  z-index: 3;
  height: 100vh;
}
.loading{
  background-color:#fff;
  opacity: 1;  /*非IE瀏覽器下設置透明度為90%*/
}
</style>