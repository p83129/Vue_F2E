<template>
  <div class="customer">
    <img class="logo" src="@/assets/logo.png" @click="index">
    <div id="nav">
      <div id="title">
        <router-link to="/">首頁 </router-link> 
        <router-link to="/admin">會員列表 </router-link>
        <router-link to="/customer">自選清單</router-link>
      </div>
      <div class="login_div">
        <button id="login" class="login" @click="login">登入</button>
      </div>
    </div>
    <h3>自選清單</h3>
    <div class="content_div">
      <!-- 下拉式選單 -->
      <div class="select_box">
        <select v-model="input.country">
          <option :value="null">全部國家</option>
          <option v-for="item in typeList.sort" :key="item.key">
            {{ item }}
          </option>
        </select>
        <select v-model="input.gender">
          <option :value="null">全部性別</option>
          <option  v-for="item in titleList.map" :key="item.key">
            {{ item.gender }}
          </option>
        </select>
      </div>
      <div class="total">
        <span v-if="input.country != null ">篩選結果：{{promise.length}} 人，</span>
        <span>共：{{selected.length}} 人</span>
      </div>
      <!-- 編輯會員資料 -->
      <div class="edit_div" id="edit_div">
        <div class="edit_span">
          <span>編輯會員資料</span>
        </div>
        <div class="member_info">
          <div class="member_picture">
            <img id="preview_img" :src="memberInfo.img">
            <input type="file" @change="uploadFile(this)" ref="files">
          </div>
          <div class="member_data" id="member_data">
            <div>
              <label>First Name</label>
              <input type="text" v-model="memberInfo.FirstName">
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" v-model="memberInfo.LastName">
            </div>
            <div style="width:380px">
              <label>Birth</label>
              <input type="text" style="width:353px" v-model="memberInfo.Birth">
            </div>
            <div>
              <label>E-Mail</label>
              <input type="email" v-model="memberInfo.EMail">
            </div>
            <div>
              <label>Gender</label><br>
              <input type="radio" value="male" v-model="memberInfo.Gender">Male
              <input type="radio" value="female" v-model="memberInfo.Gender">Female
            </div>
            <div>
              <label>Country</label>
              <input type="text" v-model="memberInfo.Country">
            </div>
            <div>
              <label>State</label>
              <input type="text" v-model="memberInfo.State">
            </div>
            <div>
              <label>City</label>
              <input type="text" v-model="memberInfo.City">
            </div>
            <div>
              <label>Street</label>
              <input type="text" v-model="memberInfo.Street">
            </div>
            <div style="width:380px">
              <label>Number</label><br>
              <input type="text" v-model="memberInfo.Number">
            </div>
            <div style="width:380px">
              <label>Coordinates</label><br>
              <input type="text" v-model="memberInfo.Lat">
              <input type="text" style=" margin-left: 20px;" v-model="memberInfo.Lng">
            </div>
          </div>
        </div>
        <div class="form_btn">
          <button class="ensure_btn">確定</button>
          <button class="close_btn">取消</button>
        </div>
      </div>
      <div class="table_div">
        <table>
            <tr class="table_title">
                <th>自選清單</th> 
                <th>照片</th> 
                <th>帳號</th> 
                <th>姓名</th> 
                <th>性別</th> 
                <th>年齡</th> 
                <th>國籍</th> 
                <th>電子郵件</th> 
                <th>編輯</th> 
            </tr>
            <tr :id="1+num++" v-for="(item,num) in content" :key="item.key" class="userdata_tr">
              <td>
                <input :id="'chk'+num" 
                  type="checkbox" 
                  :value="item" 
                  checked
                  @click="toggleCheckSingle(num)"
                 >
              </td>
              <td>
                <div>
                  <img :src="item.picture.thumbnail">
                </div>
              </td>
              <td>{{item.login.username}}</td>
              <td>{{item.name.first+" "+item.name.last}}</td>
              <td>{{item.gender}}</td>
              <td>{{item.dob.age}}</td>
              <td>{{item.location.country}}</td>
              <td>{{item.email}}</td>
              <td>
                <div>
                  <button class="edit_btn" v-on:click="edit_btn(num-1)">編輯</button>
                </div>
              </td>
            </tr>
        </table>
      </div>
      <!-- 分頁 -->
      <div class="page-content">
          <nav class="page-nav">
              <ul>
                  <li class="prev-btn page-item" v-if="currPage!=1" @click="pagination(currPage-1)">
                      <a href="#" class="page-link">
                          <span>«</span>
                      </a>
                  </li>
                  <li class="page-item" v-for="item in page" :key="item.key" :class="{active:currPage==item}" @click="pagination(item)">
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

<script src="@/js/Customer.js"></script>
<style src="@/css/admin.css"></style>

<style scoped>
.customer {
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
</style>
