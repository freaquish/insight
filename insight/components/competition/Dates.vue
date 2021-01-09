<template>
  <div class="w-screen h-screen flex flex-col pt-2">
    <div class="flex px-4">
      <span @click="onBackClick" class="material-icons"
        >keyboard_backspace</span
      >
    </div>

    <div class="w-full flex flex-col px-4 pt-4">
      <form class="bg-white pt-6 pb-8" @submit.prevent>
        <div class="mb-4 relative">
          <span
            class="block text-gray-600 text-sm text-left font-bold font-muli"
          >
            Start Date
          </span>

          <!-- Start -->
          <div class="absolute z-10">
            <vc-calendar
              class="shadow-md"
              v-show="showing === 'start'"
              :attributes="startAttributes"
              @dayclick="onDayClick"
            ></vc-calendar>
          </div>
          <div
            @click="invokePicker('start')"
            class="w-48 py-2 px-2 text-base font-muli font-semibold text-gray-700 h-10 bg-blue-100 mt-2 border border-gray-500 rounded-md"
          >
            {{ getDateString(range.start) }}
          </div>

          <span class="material-icons my-4 text-gray-700"> arrow_downward </span>
          <!-- End -->
          <span
            class="block text-gray-600 text-sm text-left font-bold font-muli"
          >
            End Date
          </span>
          <div class="absolute z-10">
            <vc-calendar
              class="shadow-md"
              v-show="showing === 'end'"
              :attributes="endAttributes"
              @dayclick="onDayClick"
            ></vc-calendar>
          </div>
          <div
            @click="invokePicker('end')"
            class="w-48 py-2 px-2 text-base font-muli font-semibold text-gray-700 h-10 bg-blue-100 mt-2 border border-gray-500 rounded-md"
          >
            {{ getDateString(range.end) }}
          </div>

          <span class="material-icons my-4 text-gray-700"> arrow_downward </span>

          <!-- Results -->
          <span
            class="block text-gray-600 text-sm text-left font-bold font-muli"
          >
            Result Date
          </span>
          <div class="absolute z-10">
            <vc-calendar
              class="shadow-md"
              v-show="showing === 'result'"
              :attributes="resultAttributes"
              @dayclick="onDayClick"
            ></vc-calendar>
          </div>
          <div
            @click="invokePicker('result')"
            class="w-48 py-2 px-2 text-base font-muli font-semibold text-gray-700 h-10 bg-blue-100 mt-2 border border-gray-500 rounded-md"
          >
            {{ getDateString(range.result) }}
          </div>
        </div>

        <div class="w-full flex flex-row justify-center mt-10">
            <button @click="onNextClick" class="font-lato w-full py-2 outline-none focus:outline-none text-xl font-semibold bg-cremson-red rounded-md text-white">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'

interface VCalenderAttribute {
  highlight: boolean
  dates: Date[]
}

interface range {
  [k: string]: any
  start: Date
  end: Date
  result: Date
}
export default Vue.extend({
  data() {
    return {
      range: {
        start: new Date(Date.now()),
        end: new Date(Date.now() + 24 * 60 * 60 * 100),
        result: new Date(2021, 0, 10),
      } as range,
      masks: {
        input: 'YYYY-MM-DD',
      },
      showing: null as null | string,
    }
  },
  computed: {
    startAttributes(): VCalenderAttribute[] {
      return [
        {
          highlight: true,
          dates: [this.range.start],
        },
      ]
    },
    endAttributes(): VCalenderAttribute[] {
      return [
        {
          highlight: true,
          dates: [this.range.end],
        },
      ]
    },
    resultAttributes(): VCalenderAttribute[] {
      return [
        {
          highlight: true,
          dates: [this.range.result],
        },
      ]
    },
  },
  methods: {
    onBackClick(): void {},
    onDayClick(day: any): void {
      if (this.showing != null) {
        this.range[this.showing] = day.date
        this.showing = null
      }
    },
    invokePicker(picker: string): void {
      this.showing = picker
    },
    getDateString(date: Date): string {
      return date.toDateString()
    },
    verifyDates(): boolean{
        return this.range.result.getDate() > this.range.end.getDate() && 
         this.range.end.getDate() > this.range.start.getDate();
    },
    onNextClick():void {
        if(this.verifyDates()){
            
        }
    }
  },
})
</script>


<style scoped>
.bg-cremson-red {
  background-color: #fa6262;
}
</style>