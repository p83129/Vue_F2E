<template>
  <div id="index">
    <img class="logo" src="@/assets/logo.png" @click="index">
    <div id="nav">
      <div id="title">
        <router-link to="/">首頁 </router-link> 
        <router-link to="/admin">會員列表 </router-link>
        <router-link to="/customer" v-if="selected != null">自選清單</router-link>
      </div>
      <div class="login_div">
          <button class="login" @click="login">登入</button>
      </div>
    </div>
      <h3>前端開發人力仲介</h3>
      <div class="promise_div">
          <!-- 會員資料-蓋板 -->
          <div class="memberinfo_div">
              <div class="memberinfo_flex">
                  <div class="memberinfo_img">
                      <img :src="memberInfo.img">
                  </div>
                  <div class="member_info">
                        <ul>
                            <li>{{memberInfo.name}}</li>
                            <li>{{memberInfo.gender}}</li>
                            <li>{{memberInfo.email}}</li>
                            <li>{{memberInfo.phone}}</li>
                            <li>{{memberInfo.age}}</li>
                        </ul>
                  </div>
              </div>
              <!-- map -->
              <div class="map_div">
                  <!-- <p>lat:{{center.lat}} || lng:{{center.lng}} </p> -->
                  <GmapMap
                  :center="center"
                  :zoom="3"
                  map-type-id="terrain"
                  style="height: 290px"
                  >
                    <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                    />
                  </GmapMap>                 
              </div>
          </div>
          <!-- 會員資料 -->
          <div class="content" :id="num++" v-for="(item,num) in promise" :key="item.key" v-on:click="member_info(num-1,lat,lng)">
              <div class="username">{{item.name.first}} {{item.name.last}}</div>
              <img :src="item.picture.large">
              <div class="country">{{item.location.country}}</div>
              <div class="country">{{item.location.city}}</div>           
          </div>
          <!-- 分頁 -->
          <div class="page-content">
              <nav class="page-nav">
                  <ul>
                      <li class="prev-btn page-item" v-if="currPage!=1" v-on:click="pagination(currPage-1)">
                          <a href="#" class="page-link">
                              <span>«</span>
                          </a>
                      </li>
                      <li :id="item" class="page-item" v-for="item in page" :key="item.key" :class="{active:currPage==item}" v-on:click="pagination(item)">
                          <a href="#" class="page-link">{{item}}</a>
                      </li>
                      <li class="next-btn page-item" v-if="currPage!=page" v-on:click="pagination(currPage+1)">
                          <a href="#" class="page-link">
                              <span>»</span>
                          </a>
                      </li>
                  </ul>
              </nav>
          </div>
      </div>
  </div>
</template>

<script src="@/js/Index.js"></script>
<style src="@/css/index.css"></style>