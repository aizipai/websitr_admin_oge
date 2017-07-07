<template>
	<div>
		<b-header></b-header>

		<div class="b-body">
			<div class="b-sidebar">
				<b-sidebar></b-sidebar>
			</div>
			<div class="b-content">
				<router-view></router-view>
			</div>
		</div>
		
	</div>
</template>

<script>

import BHeader from '../components/Header.vue'
import BSidebar from '../components/Sidebar.vue'

export default{
	components:{
		BHeader,
		BSidebar
	}
}
	
</script>

<style lang="stylus">
	$w=240px
	.b-sidebar
		width $w
		float left
	.b-content
		padding 0 30px
		margin-left $w
</style>