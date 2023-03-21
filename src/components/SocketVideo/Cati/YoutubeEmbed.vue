<template>
	<iframe width="100%" :src="'https://www.youtube.com/embed/' + videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>

<script>
export default {
	props: {
		videoID: {
			type: String,
			required: true
		}
	}
}
</script>