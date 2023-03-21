<template>
	<div class="d-flex" :class="message.user == 1 ? '':'flex-row-reverse'">
		<div class="message-container py-1 px-3"  :class="message.user == 1 ? 'secondary-user':''">
			<div>
				<div v-if="message.isFile" class="d-flex flex-row flex-grow-1" style="width: 100%;">
					<div style="width: 100%">
						<FileByType v-if="!message.isLoading" :isLoading="message.isLoading" :fileData="message.fileData" />
						<v-progress-linear
							v-if="message.isLoading"
							color="white"
							:value="message.loadingProgress"
							></v-progress-linear>
					</div>
				</div>
				<div v-else class="d-flex flex-row flex-grow-1" style="width: 100%;position:relative;">
					<p class="mb-2 white--text" style="width: 100%">{{ message.message }}</p>
				</div>
			</div>
			<div style="width: 100%">
				<p class="mb-0 caption message-time-container white--text"><small>{{ message.createdAt }}</small></p>
			</div>
		</div>
	</div>
</template>

<script>
import FileByType from './FileByType.vue'
export default {
	name: 'SingleMessage',
	components: {FileByType},
	props: {
		message: {
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>
	.message-container{
		background-color: #2250b3;
		position: relative;
		min-width: 40%;
		max-width: 70%;
		min-height: 30px;
		border-radius: 10px;
	}
	.message-container.secondary-user{
		background-color: #7b7b7b;
	}
	.message-time-container{
		position: absolute;
		bottom: 0;
		right: 10px;
	}
</style>
