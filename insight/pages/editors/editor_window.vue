<template>
  <div class="w-full h-screen flex flex-col bg-green-400">
     <div class="w-full h-16 px-4 py-2 mt-4 flex">
        <span @click="$router.go(-1)" class="material-icons stroke-current text-white">keyboard_backspace</span>
     </div>

     <div class="w-full h-auto pt-2 flex justify-between">

        <div @click="$router.push('/editors/custom_editor')" class="overflow-hidden w-48 mx-2 pt-4 pb-4 h-auto flex-col rounded-lg shadow-md bg-white">
           <div class="flex justify-center w-full h-20 pt-4"><span class="material-icons text-4xl">perm_media</span></div>
           <div class="px-2 font-lato font-semibold text-lg">Editor</div>
           <div class="pl-2 pt-1 pr-4 font-muli texxt-base">Upload Images, Video or Audio in your post</div>
        </div>

         <div @click="$router.push('/editors/type_writer')" class="overflow-hidden w-48 mx-2 pt-4 pb-4 h-auto flex-col rounded-lg shadow-md bg-white">
           <div class="flex justify-center w-full h-20 pt-4"><span class="material-icons text-4xl">text_fields</span></div>
           <div class="px-2 font-lato font-semibold text-lg">Type Writer</div>
           <div class="pl-2 pt-1 pr-4 font-muli texxt-base">Write blog, poem, quotes or tweets.</div>
        </div>
     </div>
  </div>
</template>

<script>
export default{}
</script>

<style  scoped>

</style>
