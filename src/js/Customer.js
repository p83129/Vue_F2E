export default{
    data(){
      return{
        promise: [],
        data: [],
        page: '', 
        currPage: 1,
        memberCount: '',
        memberInfo: {},
        input:{
          country: null,
          gender: null
        },
        selected: [],
        IsLoading: false
      }
    },
    mounted(){
      this.getpeopleData();
      this.login_state();
    },
    methods:{
        //首頁
        index(){
            this.$router.push('/');
        },
        // 判斷登入狀態
        login_state(){
            let title = document.getElementById("title");
            let login = document.getElementById("login"); 
            let msg = {login : '登入' , logout : '登出'};     
            // console.log(msg); 
            const IsLogin = localStorage.getItem('token') == 'ImLogin';
            if(IsLogin){
                login.innerText = msg.logout;
                title.style.visibility = 'visible';
                login.classList = 'logout login';
                // alert("!!!")
    
            }else{
                this.$router.push('/');
            }
        }, 
        // 登入&登出鈕
        login(){
            // 登出
            let title = document.getElementById("title");
            let login = document.getElementById("login"); 
            let msg = {login : '登入' , logout : '登出'};    
            if(login.innerText == msg.login){
                login.innerText = msg.login;
                title.style.visibility = 'hidden';
                login.classList = 'login';
                localStorage.removeItem('token');
                localStorage.removeItem('selected');
                this.$router.push('/');
                //alert("+++++")
            }
            // 登入
            else{
                this.$router.push('/login');
                //alert("****")
            }
        },   
        getpeopleData(){  
            let loading = document.querySelector(".loading");
            loading.style.display = 'block';
            this.IsLoading = true;          
            this.selected = this.$route.params.paramsName;
            if(this.selected!=null){
                
                localStorage.setItem('selected',JSON.stringify(this.selected));
                const storedNames = JSON.parse(localStorage.getItem("selected"));
                this.selected = storedNames
            }else{
                const storedNames = JSON.parse(localStorage.getItem("selected"));       
                this.selected = storedNames
            }                    
            console.log("重整也不用擔心值不在啦NEW~~",this.selected)
            this.data =  this.selected; 
            
            if(this.IsLoading == true){
                this.IsLoading = false;
                loading.style.display = 'none'
            }
            //第一頁
            if(this.selected.length > 10){
                this.pagination(1)
            }else{
                this.promise = this.selected
            }           
            
            // console.log(this.promise[0]);
        },
        //編輯會員資料
        edit_btn(num){
            // alert(num);
            let hidebg = document.getElementById("hidebg");
            let edit_div = document.getElementById("edit_div");
            let close = document.getElementById("close");
    
            //串接會員蓋板資料
            let member = this.promise;
            let img = member[num].picture.large;
            let FirstName = member[num].name.first;
            let LastName = member[num].name.last;
            let Birth = member[num].dob.date;
            let EMail = member[num].email;
            let Gender = member[num].gender;
            let Country = member[num].location.country;
            let State = member[num].location.state;
            let City = member[num].location.city;
            let Street = member[num].location.street.name;
            let Number = member[num].location.street.number;
            let Lat = member[num].location.coordinates.latitude;
            let Lng = member[num].location.coordinates.longitude;
    
            this.memberInfo = {
            img,
            FirstName,
            LastName,
            Birth,
            EMail,
            Gender,
            Country,
            State,
            City,
            Street,
            Number,
            Lat,
            Lng
            };
            console.log("testhihi",FirstName)
    
            //遮罩
            hidebg.style.display = 'block';
            // hidebg.style.height = document.body.scrollHeight+"vh";
            edit_div.style.display = 'block';
    
            //變更圖片
            // uploadFile(ee);
    
            //點擊空白處消失
            hidebg.onclick = function () {   
            edit_div.style.display = 'none';
            hidebg.style.display = "none";        
            }
    
            //取消按鈕
            close.onclick = function(){
            edit_div.style.display = 'none';
            hidebg.style.display = "none"; 
            }
    
            //esc鍵
            document.addEventListener("keyup",function(event){
                if(event.keyCode == 27) {
                    // alert("!!!")
                    document.getElementById("close").click(); 
                }
            });
        },
        //移除篩選資料
        toggleCheckSingle(num) {                        
            let NewSelected = this.selected.filter((item) => item !== this.selected[num-1]);
            document.getElementById(num).style.display = 'none';
            this.selected = NewSelected;
    
            localStorage.removeItem('selected');
            localStorage.setItem('selected',JSON.stringify(NewSelected));

            //無資料跳回會員
            if(this.selected.length == 0){
                this.$router.push('/admin');
            }
        },
        Userdata(page){
            let perPage = 10;
            let Alldata = this.data;
            let array = [];
            let n=0;
    
            for(let i=(page-1)*perPage ; i<page*perPage ; i++){
                array = Alldata[i];
                this.$set(this.promise,n,array);
                n++;                  
            }
            for(let j=1 ; j<=10 ; j++){
                let data = document.getElementById(j);
                data.style.display = 'table-row'; 
            }
        },
        //分頁
        pagination(page){
            let perPage = 10;
            let Alldata = this.data;
            let dataTotal = this.promise.length;
            let arrayData = [];
            let n=0;
    
            this.currPage = page;
            //第一頁
            if(page == 1 || page == 0){
                this.Userdata(page);
                this.currPage == 1;
            
            }else if(page != this.page){
                this.Userdata(page);
    
            //最後一頁
            }else{
                for(let j=(page-1)*perPage ; j<((page-1)*perPage)+(dataTotal%perPage) ; j++){
                    arrayData = Alldata[j];
                    this.$set(this.promise,n,arrayData);
                    n++;                   
                } 
                for(let k=perPage ; k>dataTotal%perPage ; k--){
                    let data = document.getElementById(k);
                    data.style.display = 'none';
                    // data.style.visibility = 'hidden';
                }
            }
        },
        //總頁數
        totalPage(sum){
            if(sum % 10 == 0){
                this.page = sum / 10;
                // console.log('sum++++++',this.page)
            }else{
                this.page = parseInt(sum / 10)+1;
                // console.log('sum-----',this.page)
            }
        }
    },
    computed:{
        typeList(){
            let obj = {
            sort: [],
            map: {},
            }
            this.data.forEach((item) => {
            let {location,gender} = item
            if(!obj.map[location.country]){
                obj.sort.push(location.country)
                obj.map[location.country] = {
                sort: [],
                map: {},
                genderData:[]
                }
            }
            obj.map[location.country].genderData.push(item)
            obj.map[location.country].sort.push({[gender]:item})
            obj.map[location.country].map[gender] = {gender,item}
    
            })
            return obj;
        },
        titleList(){
            //交叉篩選
            this.input.gender = null;
            if(this.input.country){
            return this.typeList.map[this.input.country]
            }
            else{
            return [];
            }
        },
        content(){
            //性別
            if(this.input.gender){
                let gender = this.titleList.sort.length;
                let array = [];
        
                for(let i=0 ; i<gender ; i++){
                    array[i] = this.titleList.sort[i][this.input.gender]
                }
        
                this.promise = array.filter(str => !!str)
                //頁數
                let sum = this.promise.length;
                this.totalPage(sum)       
                return this.promise
            }
            //國家
            else if(this.input.country){
                this.promise = this.titleList.genderData

                //頁數
                let num = this.promise.length;
                this.totalPage(num)
        
                return this.promise
            }
            else{
                let sum = this.data.length;
                this.totalPage(sum);
                return this.promise;         
            }
        },      
    }
}
