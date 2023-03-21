<template>
	<div class="fill-height d-flex flex-column flex-grow-0" style="background-color: #f2f2f2">
		<div id="chat-messages-container" class="fill-height d-flex flex-column justify-space-between">
			<div id="scroll-chats-container" class="d-flex flex-column align-end justify-end flex-grow-1 py-4" style="overflow-y: scroll;" :style="'height:' + chatContainerHeight + 'px'">
				<v-container
					v-for="(message, index) in Object.values( listMessage )"
					:key="index"
					style="color: #022d41;"
					class="rounded-lg py-1"
				>
					<SingleMessage :message="message"/>
				</v-container>
			</div>
			<div class="send-message-container d-flex flex-row align-center justify-center py-2">
				<v-row no-gutters>
					<v-col cols="12">
						<div class="d-flex flex-row align-center justify-center px-4">
							<v-btn class="mt-1 mr-1" icon
								@click="onButtonClick"><v-icon size="30" color="#2250B3">mdi-paperclip</v-icon></v-btn>
							<input
								ref="uploader"
								class="d-none"
								type="file"
								@change="onFileChanged"
							>
							<v-text-field
								v-on:keyup.13="insertDb()"
								style="width:250px"
								filled
								rounded
								dense
								hide-details
								placeholder="Escribe un mensaje aquí"
								v-model="message"
							>
							</v-text-field>
							<v-btn
								@click="insertDb()"
								class="ml-2"
								rounded
								height="40"
								width="40px"
								style="background: #feb62d"
								icon
								:disabled="message === ''"
							>
								<v-icon class="ml-1" outlined color="white">mdi-send</v-icon>
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</div>
		</div>
	</div>
</template>

<script>
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import moment from "moment";
import {fileUpload, getFilePublicUrl} from '@/helpers/api/files'
import SingleMessage from './SingleMessage'

export default {
  props: {
    salachat: {
      type: String|Number,
    },
    hasChat: {
      type: Function
    }
  },
	components: {SingleMessage},
  data() {
    return {
      listMessage: {},
			chatContainerHeight: null,
			chatSizeObserver: null,
			message: '',
			file: null,
			needFilesUrl: true
    };
  },
	mounted(){
		this.getChatDimensions()
		this.listenChat()
	},
	methods: {
		getChatDimensions(){
			const chatContainer = document.getElementById('scroll-chats-container')
			if(chatContainer){
				this.chatSizeObserver = new ResizeObserver(this.changeChatDimensions).observe(chatContainer)
			}
		},
		updateScroll() {
			const element = document.getElementById('scroll-chats-container')
			if(element){
				element.scrollTop = element.scrollHeight
			}
		},
		changeChatDimensions (dims) {
			if (dims && dims[0] && dims[0].contentRect.height && !this.chatContainerHeight) {
				this.chatContainerHeight = dims[0].contentRect.height
			}
		},
    clearMessage() {
      this.message = ""
    },
    insertDb() {
			if(!this.message || this.message == '') return
      const db = getDatabase();
      push(ref(db, "chat/" + this.salachat), {
        message: this.message,
        createdAt: moment(new Date()).format("HH:mm"),
        user: this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 1 : 2,
      });
      this.clearMessage();
    },
		setFilesUrl(){
			if(this.needFilesUrl){
				Object.keys(this.listMessage).forEach(async (elementKey) => {
					const currentChat = this.listMessage[elementKey]
					if(currentChat.fileData && currentChat.fileData.mime.includes('image/') && !currentChat.isLoading){
						const fileInfo =  await getFilePublicUrl({attachmentID: currentChat.fileData.id})

      			const db = getDatabase()
						set(ref(db, "chat/" + this.salachat + '/' + elementKey), {
							isFile: true,
							fileData: fileInfo.data,
							createdAt: moment(new Date()).format("HH:mm"),
              user: this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 1 : 2,
						})
					}
				})
				this.needFilesUrl = false
			}
		},
    listenChat() {
      const db = getDatabase();
      const starCountRef = ref(db, "chat/" + this.salachat);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
				const isNew = data && Object.values( data ).length > Object.values( this.listMessage ).length
				if(data && Object.values( data ).length){ this.listMessage = data }
				if(isNew){
					this.needFilesUrl && this.setFilesUrl()
					this.hasChat()
					setTimeout(() => {
						this.updateScroll()
					}, 200)
				}
      });
    },
		async onButtonClick() {
			this.$refs.uploader.click()
		},
		async onFileChanged(e) {
			const newFile = e.target.files[0]
			if(newFile){
				const data = {
					attachment: newFile,
					videoCallID: 1
				}
				const db = getDatabase();
				const fileID = push(ref(db, "chat/" + this.salachat), {
					isFile: true,
					isLoading: true,
					loadingProgress: 0,
					createdAt: moment(new Date()).format("HH:mm"),
          user: this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 1 : 2,
				})
				const fileupload = await fileUpload(data, (stats) => {
					set(ref(db, "chat/" + this.salachat + '/' + fileID.key + '/loadingProgress'), stats.loaded*100/newFile.size)
				})
				if(fileupload.success){
					let fileData = fileupload.data
					if( fileupload.data.mime.includes('image/') ){
						const fileInfo =  await getFilePublicUrl({attachmentID: fileupload.data.id})
						fileData = fileInfo.data
					}
					set(ref(db, "chat/" + this.salachat + '/' + fileID.key), {
						isFile: true,
						fileData,
						createdAt: moment(new Date()).format("HH:mm"),
            user: this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 1 : 2,
					})
				}
			}
		},
	}
}
</script>
<style scoped>
.local-view{
	position: absolute;
	left: 10px;
	bottom: 10px;
  width: 240px;
  height: 140px;
  border-radius: 10px;
	background-color: #f2f2f2;
}
.local-view, .local-view video{
	height: 140px;
	max-height: 140px;
}
.local-view.sidebar{
	position: static;
  width: 100%;
  height: 100%;
  border-radius: 10px;
	background-color: white;
}
#all-video-container{
	position: relative;
}
#operator-remote video, #waiting-local{
	width: 100%;
	height: 100%;
  border-radius: 10px;
	object-fit: cover;
	border: 1px solid grey;
}
.send-message-container{
	background-color: #f2f2f2;
	border-top: 1px solid #cbcbcb;
	min-height: 53px;
}
/deep/ #remotes-video video, #remote-waiting {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#scroll-chats-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#scroll-chats-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
