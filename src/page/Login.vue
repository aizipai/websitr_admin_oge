
<template>
	<div class="login-wrapper">
		<!-- <div class="title">管理系统登录</div> -->
		<el-form 
		class="login-form" 
		ref="loginForm" 
		:model="loginForm" 
		:rules="validRule">
		  <el-form-item prop="userName">
		    <el-input 
		    v-model="loginForm.userName" 
		    placeholder="账号"></el-input>
		  </el-form-item>
		  <el-form-item prop="userPassW">
		    <el-input 
		    type="password"
		    v-model="loginForm.userPassW" 
		    placeholder="密码"></el-input>
		  </el-form-item>
		  <el-form-item style="width:100%;">
     		<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
     		<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    	</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				logining:false,
				loginForm: {
					userName: 'dudu',
					userPassW: "123"
				},
				validRule: {
					userName: [
						{required: true, message: '请输入账号', trigger: 'blur'}
					],
					userPassW: [
						{required: true, message: '请输入密码', trigger: 'blur'},
					]
				}
			}
		},
		methods: {
			handleSubmit(){
				var _this = this
				this.$refs.loginForm.validate((valid)=>{
					if(valid){
						this.logining = true
						var loginParams = {userName:this.loginForm.userName,userPassW:this.loginForm.userPassW}
						//ajax 登录
						setTimeout(()=>{
							this.logining=false
						},1000)
						alert('可以登录')
					}else{
						alert('不可以登录')
					}
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.login-wrapper
		margin 100px auto 0
		width 500px
		height 100%
		padding 30px
		box-shadow 0 0 15px rgba(0,0,0,.7)
		border-radius 5px
		
		.title 
			text-align center
			margin-bottom 20px
			font-size 25px
			font-weight 700
			color lightBlue

</style>