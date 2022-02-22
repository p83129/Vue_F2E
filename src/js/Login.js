export default({

  data(){
    return{
      account:'lucy.gutierrez@example.com',
      password:'passion',
      msg:'',
      IsLoading: false
    }
  },
  methods:{
    submit_Btn(){
        let account = this.account;
        let password = this.password;
        let msg = {err : '帳號或密碼有誤，請重新輸入！',
                   success:'登入成功！'};
        this.msg = msg;
        // console.log(this.msg);
        let login_msg = document.getElementById("login_msg");
        if(account == '' || password == ''){
          alert('帳號或密碼不得為空!');
        }
        else if( account == 'lucy.gutierrez@example.com' && password == 'passion'){

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
          if(this.msg.err){
            this.msg = this.msg.err;
            login_msg.style.display = 'block'; 

            setTimeout(()=>{
              login_msg.style.display = 'none';
            },3000);
            clearTimeout(this.msg.err);

            alert('帳號或密碼有誤!');
          }                  
        }

    },
    clear_Btn(){
      this.account = ''
      this.password = ''
      return true
    }
  }
})