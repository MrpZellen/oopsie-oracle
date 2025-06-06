<script setup lang="ts">

const { loggedIn, session, user, clear, fetch } = useUserSession()
var invalidCredentials = useState<boolean>('invalidCredentials', () => false)
const credentials = reactive({
  email: '',
  password: '',
})
async function login() {
  console.log(credentials)
  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch(() => {
      invalidCredentials.value = true
    })
}
</script>

<template>
  <BContainer class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="box">
      <h1 class="text-center heading">Welcome Back!</h1>
      <p class="text-center subtext">Don't have an account? <NuxtLink to="/sign-up">Create one!</NuxtLink>
      </p>
      <form @submit.prevent="login">
        <div v-if="invalidCredentials" class="h4 text-danger"><strong>Error! Must input a valid email and
            password!</strong></div>
        <input class="mb-3 inputs" v-model="credentials.email" type="email" placeholder="Email" />
        <input class="mb-3 inputs" v-model="credentials.password" type="password" placeholder="Password" />
        <button type="submit" class="login-sign-up-buttons">Login</button>
      </form>
    </div>
  </BContainer>
</template>

<!--  const { user } = await requireUserSession(event)  -->