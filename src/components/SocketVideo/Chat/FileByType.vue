<template>
	<div
			v-if="fileType === 'image'"
			class="images-container" style="width: 100%">
		<img
			:src="fileData.tempUrl" width="100%" class="mb-2"/>
	</div>
	<div v-else class="files-container" style="width: 100%">
		<v-btn
			class="mb-4 d-flex justify-space-between"
			block
			depressed
			@click="getFileUrl">
			<v-icon class="ml-1" outlined :color="fileIconColor">{{fileIcon}}</v-icon>
			<p class="mb-0 caption text-none text-truncate" style="max-width:200px">{{fileData.name}}</p>
			<v-icon class="ml-1" outlined color="#2250B3">mdi-download-circle-outline</v-icon>
		</v-btn>
	</div>
</template>

<script>
import {getFilePublicUrl} from '@/helpers/api/files'
export default {
	name: 'FileByType',
	props: {
		fileData: {
			type: Object,
			required: true
		},
		isLoading: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		fileType() {
			if( this.fileData.mime.includes('image/') ){
				return 'image'
			}
			else if( this.fileData.mime.includes('application/pdf') ){
				return 'pdf'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ){
				return 'word'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ){
				return 'excel'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation') ){
				return 'ppt'
			}
			return 'file'
		},
		fileIcon(){
			if( this.fileData.mime.includes('image/') ){
				return 'mdi-file-image'
			}
			else if( this.fileData.mime.includes('application/pdf') ){
				return 'mdi-file-pdf-box'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ){
				return 'mdi-file-word-box'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ){
				return 'mdi-file-excel-box'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation') ){
				return 'mdi-file-powerpoint-box'
			}
			return 'mdi-file'
		},
		fileIconColor(){
			if( this.fileData.mime.includes('image/') ){
				return 'blue'
			}
			else if( this.fileData.mime.includes('application/pdf') ){
				return 'red'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ){
				return '#1C6C3F'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ){
				return '#065692'
			}
			else if( this.fileData.mime.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation') ){
				return '#BE3C1B'
			}
			return 'grey'
		}
	},
	methods: {
		async getFileUrl(){
			const fileInfo =  await getFilePublicUrl({attachmentID: this.fileData.id})
			window.open(fileInfo.data.tempUrl, '_blank').focus()
		}
	}
}
</script>

<style scoped>
	.files-container{
		min-width: 280px;
		max-width: 280px;
	}
	.images-container{
		min-width: 250px;
	}
</style>
