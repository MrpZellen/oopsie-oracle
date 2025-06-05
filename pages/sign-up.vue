<script setup lang="ts">

const { fetch: refreshSession } = useUserSession()
var invalidCredentials = useState<boolean>('invalidCredentials', () => false)
const credentials = reactive({
    email: '',
    password: '',
})
async function login() {
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
    <h1 class="text-center">Welcome!</h1>
    <p class="text-center">Have an account? <a href="/login" class="text-black">Log in!</a></p>
    <form @submit.prevent="login">
        <div v-if="invalidCredentials" class="h4 text-danger"><strong>Error! Must input a valid email and
                password!</strong></div>
        <input v-model="credentials.email" type="email" placeholder="Email" />
        <input v-model="credentials.password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
    </form>
</template>