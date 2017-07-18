<template>
	<div class="b-header">
  		<a href="#" class="t-logo">埃及旅游</a>
  		<div class='t-title'>{{title}}</div>
  		<div class='b-info'>
  			<span class="t-name">你好，{{userName}}</span>
  			<el-button 
  				type="primary" 
  				size="small" 
  				class='btn-logout'
  				@click="dialogVisible = true">退出</el-button>
  		</div>
		</el-row>

		<!-- 退出提示 -->
		<el-dialog
  		title="提示"
  		:visible.sync="dialogVisible"
  		size="tiny">
  		<span>确认退出吗？</span>
  		<span slot="footer" class="dialog-footer">
  		  <el-button @click="dialogVisible = false">取 消</el-button>
  		  <el-button type="primary" @click="logout">确 定</el-button>
  		</span>
		</el-dialog>
	</div>
</template>
<script>
	
	export default {
		props:[],
		data(){
			return{
				logout_url:API_URL['Logout'],
				title: '运营中心',
				userName: '请登录',
				userId: '123',
				dialogVisible: false
			}
		},
		methods: {
			logout(){
				
				sessionStorage.removeItem('userAccount')
				sessionStorage.removeItem('userName')
				sessionStorage.removeItem('userPassword')

				this.$router.push({path: '/login'})
				
			},
			getLoginInfo(){
				const loginInfo = this.$store.getters.loginInfo
				this.userName = loginInfo.userName || sessionStorage.getItem('userName')
				console.log(loginInfo)
			}
		},
		created(){
			const r_obj = this.$router.options.routes
			const cur_r_p = this.$route.path
			r_obj.forEach((item)=>{
				if(item.path == cur_r_p){
					this.title = item.name
					return false
				}
			})

			this.getLoginInfo()
		}
	}
	
</script>
<style lang='stylus' scoped>
	.b-header
		width 100%
		height 80px
		display flex
		justify-content space-between
		.t-logo
			flex 0 0 240px
			font-size 20px
			padding 30px 0
			width 240px
			background-color #FFD266
			text-align center
			border-bottom 1px solid transparent
			color #fff
			text-indent -999999999px
			background url(http://47.94.218.61/images/2017/07/17/2017071705551709907220.png) no-repeat center/contain
			
		.t-title
			flex 1
			margin-left 30px
			line-height 80px
			font-size 24px
			font-weight 700
			border-bottom 1px solid #CCC
		.b-info
			line-height 80px
			margin-right 30px
			border-bottom 1px solid #CCC
			.t-name
				margin-right 20px
			.btn-logout
				width 60px
</style>