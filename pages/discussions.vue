<template>
    <section v-if="loggedIn">
        <p>This page will be displayed at the /discussions route.</p>
    </section>
</template>

<script setup lang="ts">

const { loggedIn, session, user, clear, fetch } = useUserSession()
async function getConversations() {
  $fetch('/api/getConversations', {
    method: 'GET'
  })
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await navigateTo('/')
  })
  .catch(() => {
    console.log('user issue')
  })
}   
</script>