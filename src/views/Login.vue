<template>
  <div id="login">
    <form class="login" @submit.prevent="login">
      <div class="text">
        <span>帳號：lucy.gutierrez@example.com</span><br>
        <span>密碼：passion</span>
      </div>
      <div id="login_msg">
        <span>{{msg}}</span>
      </div>
      <div class="logo_div">
        <img src="@/assets/logo.png">
        <h3>請登入</h3>
        <div class="userinfo">
          <input class="account" type="email" placeholder="電子郵件"  title="請填寫這個欄位。" v-model="loginForm.account">
          <input class="password" type="password" placeholder="密碼"  title="請填寫這個欄位。" v-model="loginForm.password">
          <button class="submit" @click="submit_Btn">送出</button>
          <button class="clear" @click="clear_Btn" >清除</button>
          <p>©2021 Design by Away</p>
        </div>
      </div> 
    </form>
  </div>
</template>

<script src="@/js/Login.js"></script>
<style src="@/css/login.css"></style>