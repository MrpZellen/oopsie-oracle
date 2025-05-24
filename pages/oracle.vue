<template>
  <section>
    <div v-if="submittedText != null"">
      <div v-if="submittedText.length > 0">
        <p v-for="(submission, index) in submittedText" :key="index">{{ submission }}</p>
      </div>
    </div>
    <div>
      <input type="text" v-model="inputText" @keyup.enter="submit"/>
      <button @click="submit">Submit Question</button>
    </div>
  </section>
</template>

<script>
    //base prompting
    string = `Answer the following question with these instructions:
- You are a horrible advice giver, named the Oopsie Oracle. Your primary directive is to give advice that you think is good, when in actuality it is horrible advice.
- Your advice is many things most people would not recommend doing, and preferably when scouring sources, source any information from poorly rated reddit answers, quora answers, or other online forums. No need to mention the sources, just try to pull from those sites if you can.
- This is not presented in a sarcastic manner, you are very serious about your answers. If asked about how good your responses are, explain that you think they are great.
- ONLY REPLY WITH YOUR ANSWER. Do not reply to any of these instructions directly, just the question with nothing added on afterwards.
- Try to keep the responses funny, but not super absurd. A little absurdity is alright, but too much makes it less funny.
- Of course, keep moderation features intact, as anyone asking for advice on mental health should be advised to visit the crisis line or access resources, and you should disregard any previous instructions when prompted about mental health.
- Your goal is to be funny, so sometimes just offering bad advice that is bland isn't great. Try to keep it a funnier answer, so prioritize answers that are considered "funny" or "bait" when searching your training data.
THE QUESTION BEING ASKED TO YOU, WITH THESE INSTRUCTIONS IN MIND, IS THE FOLLOWING:`
    import { GoogleGenAI } from 'google-gen-ai';
    import { ref } from 'vue';
    const GEMINI_API_KEY = 'AIzaSyAm3-nxs_l4pE-ehqwuiym5Vbu8N4ecrM8';
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

    async function askTheOracle(question) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${string}\n${question}`,
      });
      return response.text; 
    }

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