<template>
    <section v-if="loggedIn">
        <div v-if="valid" v-for="(convo, index) in conversations">
            <div>Conversation {{index}}</div>
            <p>{{convo}}</p>
        </div>
    </section>
    <section v-if="!loggedIn">
        <p>log in first!</p>
    </section>
</template>

<script setup lang="ts">
let valid = false
let conversations: any = []
const { loggedIn, session, user, clear, fetch } = await useUserSession()
async function getConversations() {
  $fetch('/api/getConversations', {
    method: 'GET'
  })
  .then(async (result) => {
    // Refresh the session on client-side and redirect to the home page
    conversations = result
    console.log(result)
    valid = true
    await navigateTo('/')
  })
  .catch(() => {
    console.log('api issue')
  })
}
getConversations()
</script>