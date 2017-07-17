<template>
	<div>
		<b-header></b-header>

		<div class="b-body">
			<div class="b-sidebar">
				<b-sidebar></b-sidebar>
			</div>
			<div class="b-content">
				<!-- <transition  name='slide-to-left'  mode="in-out">
					<keep-alive> -->
						<router-view  :key="key"></router-view>
					<!-- </keep-alive>
				</transition > -->
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
	},
	computed: {
        key() {
            return this.$route.path.replace(/\//g, '_')
        }
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
		
	.silde-to-left-enter-active
		transiton: all .3s ease
	.slide-to-left-leave-active
		transition all .9s cubic-bezier(1, .5, .8, 1)
	.slide-to-left-enter
	.slide-to-left-leave
		transform translateX(100px)
		opacity 0

</style>