<script setup lang="ts">

const { fetch: refreshSession } = useUserSession()
var invalidCredentials = useState<boolean>('invalidCredentials', () => false)
const credentials = reactive({
    username: '',
    email: '',
    password: '',
})
async function signUp() {
    $fetch('/api/signup', {
        method: 'POST',
        body: credentials
    })
        .then(async () => {
            // Refresh the session on client-side and redirect to the home page
            await navigateTo('/')
        })
        .catch(() => {
            invalidCredentials.value = true
        })
}
</script>

<template>
    <h1 class="text-center">Welcome!</h1>
    <p class="text-center">Existing User?<a href="/login" class="text-black">Sign In Here!</a></p>
    <form @submit.prevent="signUp">
        <div v-if="invalidCredentials" class="h4 text-danger"><strong>Error! Must input a valid email and
                password!</strong></div>
        <input v-model="credentials.email" type="email" placeholder="Email" />
        <input v-model="credentials.password" type="password" placeholder="Password" />
        <input v-model="credentials.username" type="username" placeholder="Username" />
        <button type="submit">Sign Up</button>
    </form>
</template>