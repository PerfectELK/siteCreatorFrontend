
var modalDelete = Vue.component('modal-body',{
    data:function(){
        return{

        }
    },
    methods:{
      delete:function(){
          console.log('site was deleted');
      },
      quit:function(){
          this.$emit('quit');
      }
    },
    template:'#siteDeleteForm'
});

var modalChange = Vue.component('modal-body',{
    data:function(){
        return{

        }
    },
    methods:{
        change:function(){
            console.log('site was changed');
        },
        quit:function(){
            this.$emit('quit');
        }
    },
    template:'#siteChangeForm',
});



var main = Vue.component('main-c',{
    data:function () {
        return{
            modalClose:true,
            currentModal:'modalDelete',
        }
    },
    components:{
        'modalDelete':modalDelete,
        'modalChange':modalChange,
    },
    methods:{
        getModal:function(){
            this.modalClose = false;
        },
        changeSiteModal:function(siteName){
            this.currentModal = 'modalChange';
            this.getModal();
        },
        deleteSiteModal:function(siteName){
            this.currentModal = 'modalDelete';
            this.getModal();
        }
    },
    computed:{
        deleteSite:function(){
            this.modalClose = !this.modalClose;
        },
    },
    template:"#main"
});


var options = Vue.component('options-c',{
    data:() =>{
        return{

        }
    },
    template:"#options"
});

var exit = Vue.component('exit-c',{
    data:() =>{
        return{

        }
    },
    template:"#exit"
});


var routes = [
    { path: '/', component: main },
    { path: '/options', component: options },
    { path: '/exit', component: exit }
]

var router = new VueRouter({
    routes
});

var app = new Vue({
    router
}).$mount('#app');

