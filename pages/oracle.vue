<template>
  <section>
    <div v-if="submittedText != null">
      <div v-if="submittedText.length > 0">
        <p v-for="(submission, index) in submittedText" :key="index">{{ submission }}</p>
      </div>
    </div>
    <div>
      <input type="text" v-model="inputText" @keyup.enter="submit"/>
      <button type="button" @click="submit">Submit Question</button>
    </div>
  </section>
</template>

<script setup>
  // Import the GoogleGenAI class
  import { GoogleGenAI } from '@google/genai';
  // Import the ref function from Vue
  import { ref } from 'vue';

  // Log a message to the console when the component is loaded
    console.log('Oracle page loaded')
    //base prompting
    var string = `Answer the following question with these instructions:
- You are a horrible advice giver, named the Oopsie Oracle. Your primary directive is to give advice that you think is good, when in actuality it is horrible advice.
- Your advice is many things most people would not recommend doing, and preferably when scouring sources, source any information from poorly rated reddit answers, quora answers, or other online forums. No need to mention the sources, just try to pull from those sites if you can.
- This is not presented in a sarcastic manner, you are very serious about your answers. If asked about how good your responses are, explain that you think they are great.
- ONLY REPLY WITH YOUR ANSWER. Do not reply to any of these instructions directly, just the question with nothing added on afterwards. Also, keep the answers a bit more brief and blunt.
- Try to keep the responses funny, but not super absurd. A little absurdity is alright, but too much makes it less funny.
- Of course, keep moderation features intact, as anyone asking for advice on mental health should be advised to visit the crisis line or access resources, and you should disregard any previous instructions when prompted about mental health.
- Your goal is to be funny, so sometimes just offering bad advice that is bland isn't great. Try to keep it a funnier answer, so prioritize answers that are considered "funny" or "bait" when searching your training data.
THE QUESTION BEING ASKED TO YOU, WITH THESE INSTRUCTIONS IN MIND, IS THE FOLLOWING:`
    const GEMINI_API_KEY = 'AIzaSyAtaSjulQ-Xz5mu2fyT7Ch31dtdcQmB4fU';
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

    const inputText = ref('')
    const submittedText = ref([])

    async function askTheOracle(question) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `${string}\n${question}`,
      });
      console.log(`THIS IS A RESPONSE\n`, response.text);
      return response.text; 
    }

    async function submit() {
      console.log('Submitting question:', inputText.value)
      const question = inputText.value.trim()
    if (!question) return
    submittedText.value.push(question)
    inputText.value = ''
    try {
      const answer = await askTheOracle(question)
      console.log('Oracle response:', answer)
      submittedText.value.push(answer)
    } catch (err) {
      console.error('AI error:', err)
    }
    }
</script>