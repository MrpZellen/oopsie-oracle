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


<script setup lang="js">
const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const { intents } = require('./intents');
const { responses } = require('./responses');
let model;
use.load().then((loadedModel) => {
 model = loadedModel;
 console.log('Model loaded');
 startChatbot();
});


async function recognizeIntent(userInput) {
 const userInputEmb = await model.embed([userInput]);
 let maxScore = -1;
 let recognizedIntent = null;

 for (const [intent, examples] of Object.entries(intents)) {
  const examplesEmb = await model.embed(examples);
  const scores = await tf.matMul(userInputEmb, examplesEmb, false, true).data();
  //scours the scores for the maximum best response value encoded.
  const maxExampleScore = Math.max(...scores);
  if (maxExampleScore > maxScore) {
   maxScore = maxExampleScore;
   recognizedIntent = intent;
  }
 }
 return recognizedIntent;
}

//checks if the user response is something that the oracle can understand
// and if it is, it returns the response from the oracle.
// if not, it returns a default response.
async function generateResponse(userInput) {
 const intent = await recognizeIntent(userInput);
 if (intent && responses[intent]) {
  return responses[intent];
 } else {
  return "God your yapping is so horrible, I don't even know what to say.";
}
}

//starts our guy!
//TODO: refactor this to run in the browser.
function startChatbot() {
  const inputField = document.querySelector('input[type="text"]');
  const submitButton = document.querySelector('button');
  
  submitButton.addEventListener('click', async () => {
    const userInput = inputField.value;
    const response = await generateResponse(userInput);
    console.log(`User: ${userInput}`);
    console.log(`Oracle: ${response}`);
  });
}
</script>