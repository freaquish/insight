<template>
    <div class="w-full h-full">
        <div
            class="w-full h-auto px-2"
            style="display:grid;grid-template-columns: 1fr 1fr;grid-gap:0.2rem;"
          >
            <div v-for="post in collections" :key="post.post_id">
              <asset-box :post="post" />
            </div>
          </div>
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import AssetBox from "@/components/profile/AssetBox.vue"
import {CollectionPost} from "@/types/index"
export default Vue.extend({
    components: {
        AssetBox
    },
    props: {
        collections: [] as PropOptions<CollectionPost[]>
    }
})
</script>