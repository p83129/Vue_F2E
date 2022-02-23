// import { mapMutations } from 'vuex';
export default({
  data(){
    return{
      loginForm:{
        account:'lucy.gutierrez@example.com',
        password:'passion',
      },
      msg:'',
      IsLoading: false
    }
  },
  methods:{
    // ...mapMutations(['changeLogin']),
    submit_Btn () {
      this.msg = {
        err : '帳號或密碼有誤，請重新輸入！',
        success:'登入成功！'
      };
      if(this.loginForm.account == '' || this.loginForm.password == ''){
        alert('帳號或密碼不得為空!');
      }
      else if( this.loginForm.account == 'lucy.gutierrez@example.com' && this.loginForm.password == 'passion'){

        login_msg.style.display = 'block'; 
        login_msg.style.background = 'green';
        this.msg = this.msg.success;
        setTimeout(()=>{
          login_msg.style.display = 'none';
          localStorage.setItem('token','ImLogin');
          this.$router.push('/');
        },3000);
        clearTimeout(this.msg.success);
 
      }
      else{
        this.msg = this.msg.err;
        login_msg.style.display = 'block'; 
        setTimeout(()=>{
          login_msg.style.display = 'none';
        },3000);
        clearTimeout(this.msg.err);
        alert('帳號或密碼有誤!');               
      }
      // else{
      //   this.$axios({
      //     method: 'post',
      //     url: '/login',
      //     data: this.loginForm
      //   }).then(res => {
      //     console.log(res.data);
      //     this.userToken = 'Bearer ' + res.data.data.body.token;
      //     // 將使用者token儲存到vuex中
      //     this.changeLogin({ Authorization: this.userToken });
      //     this.$router.push('/');
      //     alert('登陸成功');
      //   }).catch(error => {
      //     alert('賬號或密碼錯誤');
      //     console.log(error);
      //   });
      // }
    },
    clear_Btn(){
      this.account = ''
      this.password = ''
      return true
    }
  }
})