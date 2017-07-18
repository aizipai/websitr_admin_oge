
<template>
	<div class="login-wrapper">
		<div class="title">欢迎进入运营后台</div>
		<el-form 
		class="login-form" 
		ref="loginForm" 
		:model="loginFormData" 
		:rules="validRule">
		  <el-form-item prop="userName">
		    <el-input 
		    v-model="loginFormData.userAccount" 
		    placeholder="账号"></el-input>
		  </el-form-item>
		  <el-form-item prop="userPassW">
		    <el-input 
		    type="password"
		    v-model="loginFormData.userPassword" 
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
				loginUrl: API_URL['Login'],
				logining:false,
				loginFormData: {
					userAccount: '15258264992',
					userPassword: '123456'
				},
				validRule: {
					userAccount: [
						{required: true, message: '请输入账号',}
					],
					userPassword: [
						{required: true, message: '请输入密码',},
					]
				}
			}
		},
		methods: {
			handleSubmit(){
				this.$refs.loginForm.validate((valid)=>{
					if(valid){
						this.logining = true
						const loginParams = this.loginFormData
						this.$axios.post(this.loginUrl,loginParams).then((res)=>{
							const result = res.data
							if(result.ok){
								
								const loginInfo = {
             					  userAccount: result.data.userAccount,
             					  userName: result.data.userName,
             					  userPassword:result.data.userPassword,
             					}
								this.$store.commit('SET_LOGININFO', loginInfo)

								sessionStorage.setItem('userAccount',result.data.userAccount)
								sessionStorage.setItem('userName',result.data.userName)
								sessionStorage.setItem('userPassword',result.data.userPassword)

								this.$message('登录成功！');

								this.$router.push({path:'/'})


							}else{
								this.$message.error('登录失败，检查一下账号密码吧...');
								this.logining = false
							}
						}).catch((err)=>{
							this.logining = false
							console.log(err)
							alert(err)
						})

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