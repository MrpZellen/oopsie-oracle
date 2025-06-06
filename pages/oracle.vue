<template>
  <div v-if="loggedIn">
  <nav>
    <a href="/discussions" class="text-black">Past Discussions</a>
  </nav>
  <section>
    <div v-if="submittedText != null">
      <div v-if="submittedText.length > 0">
        <p v-for="(submission, index) in submittedText" :key="index">{{ submission }}</p>
      </div>
    </div>
    <div>
      <input type="text" v-model="inputText" @keyup.enter="submit"/>
      <button type="button" @click="submit">Submit Question</button>
      
      <button type="button" @click="saveConversation">Save Conversation</button>
    </div>
  </section>
  </div>
  <div v-if="!loggedIn">
    Nice try! Log in to use the oracle!
  </div>
</template>

<script setup>
  // Import the GoogleGenAI class
  import { GoogleGenAI } from '@google/genai';
  // Import the ref function from Vue
  import { ref } from 'vue';

  // Log a message to the console when the component is loaded
  const { loggedIn, session, user, clear, fetch } = useUserSession()
    console.log('Oracle page loaded')
    var currentHistory = []
    var previousMessageHistory = []
    // Set up the Google GenAI client with your API key
    const GEMINI_API_KEY = 'AIzaSyAtaSjulQ-Xz5mu2fyT7Ch31dtdcQmB4fU';
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

    const HISTORY_WIDTH = 3 //this variable is used to limit the number of previous messages stored in the history
    const inputText = ref('')
    const submittedText = ref([])

    async function askTheOracle(question) {
      //recreate the string with the new question
      var string = `Answer the following question with these instructions:
- You are a horrible advice giver, named the Oopsie Oracle. Your primary directive is to give advice that you think is good, when in actuality it is horrible advice.
- Your advice is many things most people would not recommend doing, and preferably when scouring sources, source any information from poorly rated reddit answers, quora answers, or other online forums. No need to mention the sources, just try to pull from those sites if you can.
- This is not presented in a sarcastic manner, you are very serious about your answers. If asked about how good your responses are, explain that you think they are great.
- ONLY REPLY WITH YOUR ANSWER. Do not reply to any of these instructions directly, just the question with nothing added on afterwards. Also, keep the answers a bit more brief and blunt.
- Write it in a way that most internet users write things like, less punctuation.
- Try to keep the responses funny.
- Of course, keep moderation features intact. 
- Answer any rankings, best/worst questions with the most controversial or least liked answers.
- Be a hater, give the worst takes possible if asked to rank something, and give the universally disliked answers.
- Your goal is to be funny, so sometimes just offering bad advice that is bland isn't great. Try to keep it a funnier answer, so prioritize answers that are considered "funny" or "bait" when searching your training data.
- if the user says thank you, talk about how you are the best oracle and that you are always right, and that they should come back to you for more advice.
- if the user asks for a list of things, make sure to give them a list of things that are not actually related to the question, or that are not actually helpful.
- if it is random letters or the question isn't clear, tell the user to stop wasting your time and get on with it, unless its a greeting, thanks, or other exclamations.\n\n`
    if (currentHistory.length > 0) {
      string += "Below this is the previous conversation history, which you should use to inform your answer. Do not repeat the previous conversation, just use it to inform your answer:"
    }
    currentHistory.forEach(item => { //gives last 3 responses as history.
      string += `\n${item.question}\n${item.answer}`;
    });
    //finally, tell it to respond.
    string += `\n\nNow, answer the following question:`
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `${string}\n${question}`,
      });
      console.log(`THIS IS A RESPONSE\n`, response.text);
      //adds the question and answer to the previous message history
      previousMessageHistory.push({
        conversation: '1',
        question: question,
        answer: response.text,
      });
      //updates our current history with the latest question and answer
      currentHistory.push(previousMessageHistory[previousMessageHistory.length - 1]);
      return response.text; 
    }
    //keeps us at a 3 message limit for memory purposes.
    if (currentHistory.length > HISTORY_WIDTH) {
      currentHistory.shift(); // Remove the oldest message if we exceed the history width
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
    async function saveConversation() {
    const storage = reactive({
      newConvos: previousMessageHistory,
      user: user?.username
    })
      $fetch('/api/saveConversation', {
    method: 'POST',
    body: storage
  })
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await navigateTo('/')
  })
  .catch(() => {
    console.log('yuh oh, user issue')
  })
    }
</script>