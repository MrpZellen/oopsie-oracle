<template>
  <section>
    <div v-if="submittedText.length > 0">
      <p v-for="(submission, index) in submittedText" :key="index">{{ submission }}</p>
    </div>
    <div>
      <input type="text" v-model="inputText" @keyup.enter="submit"/>
      <button @click="submit">Submit Question</button>
    </div>
  </section>
</template>

<script>
  import {ref} from 'vue'
  
  export default {
    setup() {
      const inputText = ref('')
      const submittedText = ref([])
      
      function submit() {
        submittedText.value.push(inputText.value.trim())
        inputText.value = ''
      }

      return {
        inputText,
        submittedText,
        submit
      }
    }
  }
</script>
