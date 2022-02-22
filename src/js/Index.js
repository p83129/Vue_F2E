export default {
    name:'index',
    data(){
        return{
            promise: [],
            data: [],
            page: 8, 
            currPage: 1,
            center: {},
            markers: [],
            IsLoading: false
        }
    },
    mounted(){
        this.getpeopleData();
        this.login_state();
    },
    methods:{
        // 首頁
        index(){
            this.$router.push('/');
        },       
        // 判斷登入狀態
        login_state(){
            let title = document.getElementById("title");
            let login = document.getElementById("login"); 
            let msg = {login : '登入' , logout : '登出'};     
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
            if(login.innerText == msg.logout){
                login.innerText = msg.login;
                title.style.visibility = 'hidden';
                login.classList = 'login';
                localStorage.removeItem('token');
                localStorage.removeItem('selected');
                this.$router.push('/');
                // alert("+++++")
            }
            // 登入
            else{
                this.$router.push('/login');
                // alert("****")
            }
        }, 
        getpeopleData(){
            let loading = document.querySelector(".loading");
            loading.style.display = 'block';
            this.IsLoading = true;  
            let peopleURL = "https://randomuser.me/api/?results=150";
            this.$axios.get(peopleURL)
            .then(res => {
                this.data = res.data.results;

                if(this.IsLoading == true){
                    this.IsLoading = false;
                    loading.style.display = 'none'
                }
                //第一頁
                this.pagination(1)
            })
            .catch(err => {
                console.log(err.reponse);
            })
            
        },
        Userdata(page){
            let perPage = 20;
            let Alldata = this.data;
            let array = [];
            let n=0;

            for(let i=(page-1)*perPage ; i<page*perPage ; i++){
                array = Alldata[i];
                this.$set(this.promise,n,array);
                n++;                 
            }
            for(let j=1 ; j<=20 ; j++){
                let data = document.getElementById(j);
                data.style.display = 'block'; 
            }
            // alert('666666');
        },
        //分頁
        pagination(page){
            let perPage = 20;
            let Alldata = this.data;
            let dataTotal = this.data.length;
            let array = [];
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
                for(let j=(page-1)*perPage ; j<((page-1)*perPage)+(dataTotal%perPage); j++){
                    array = Alldata[j];
                    
                    this.$set(this.promise,n,array);
                    n++;                   
                } 
                for(let k=perPage ; k>dataTotal%perPage ; k--){
                    let data = document.getElementById(k);
                    data.style.display = 'none';
                }
            }
        },
        //人物蓋板
        member_info(num){
            alert(num);
            let member = this.promise;
            console.log("seesee",member)
            let memberinfo_img = document.getElementById("memberinfo_img");
            let img = document.createElement("img");
            let member_info = document.getElementById("member_info");
            let ul = document.createElement("ul");
            let li_name = document.createElement("li");
            let li_gender = document.createElement("li");
            let li_email = document.createElement("li");
            let li_phone = document.createElement("li");
            let li_age = document.createElement("li");
            let hidebg = document.querySelector(".hidebg");
            let member_box = document.querySelector(".memberinfo_div");
            // let iframe = document.createElement("iframe");
            // let map = new VueGoogleMaps.gmapApi.maps.Map(document.getElementById("test"),{
            //     center:{
            //         // lat:member[num].location.coordinates.latitude,
            //         // lng:member[num].location.coordinates.longitudes},
            //         lat:-34.397,
            //         lng:150.644
            //     },
            //     zoom:8
            // });
            //從這裡開-----
            let lat = parseFloat(member[num].location.coordinates.latitude);
            let lng = parseFloat(member[num].location.coordinates.longitude);
            this.center = {lat,lng};
            this.markers = {position:this.center}
            // console.log("lololo",lat)
            // console.log("lololokokoko",lng)


            li_name.textContent = member[num].name.first+"  "+member[num].name.last;
            li_gender.textContent = member[num].gender;
            li_email.textContent = member[num].email;
            li_phone.textContent = member[num].phone;
            li_age.textContent = member[num].dob.age;

            img.setAttribute("src",member[num].picture.large)
            img.setAttribute("id","img_id")
            ul.setAttribute('id',"ul_id");

            ul.appendChild(li_name);
            ul.appendChild(li_gender);
            ul.appendChild(li_email);
            ul.appendChild(li_phone);
            ul.appendChild(li_age);

            memberinfo_img.appendChild(img);
            member_info.appendChild(ul);

            hidebg.style.display = 'block';
            member_box.style.display = 'block';

            hidebg.onclick = function () {   
                hidebg.style.display = "none";  
                member_box.style.display = 'none';   
                
                let ul_id = document.getElementById("ul_id");
                let img_id = document.getElementById("img_id");
                let parentul = ul_id.parentNode;
                let parentimg = img_id.parentNode;
                parentul.removeChild(ul_id);
                parentimg.removeChild(img_id);

            }
        },

    }
    
}