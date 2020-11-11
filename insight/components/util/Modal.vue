<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="80vw">
        <template v-slot:activator ="{on, attrs}">
            <v-btn color="blue" dark v-bind="attrs" v-on="on">Show</v-btn>
        </template>
        <v-card>
            <v-card-title>Select Country </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 80vh;">
                <v-radio-group v-model="selection" column>
                    <v-radio label="Bahamas" value="bahamas"></v-radio>
                    <v-radio label="India" value="india"></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
     </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  data() {
    return {
      dialog: false,
      selection:''
    }
  }
})
</script>

<style scoped>
</style>