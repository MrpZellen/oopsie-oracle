<script setup>
async function logout() {
  $fetch('/api/logout')
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await clearSession()
    await navigateTo('/')
  })
  .catch(() => {
    console.log('logout failed!')
  })
}
logout()
</script>

<template>
  <h1 class="text-center">Logged Out!</h1>
</template>
