import Vue from 'vue'
import Hammer from '@/node_modules/hammerjs/hammer.js'
import VCalendar from "v-calendar";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);

Vue.use(VCalendar, {
    componentPrefix: 'vc'
});

