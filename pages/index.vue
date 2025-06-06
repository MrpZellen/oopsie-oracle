<script setup lang="ts">
import type { NavigationGuard } from 'vue-router'

definePageMeta({
    middleware: ["authenticated"] as unknown as NavigationGuard[],
})

reloadNuxtApp()

const { user, session, loggedIn, clear: clearSession } = useUserSession()
async function logout() {
    await clearSession()
    await navigateTo('/')
}

function signIn() {
    navigateTo('/login')
}

function signUp() {
    navigateTo('/sign-up')
}
function oracle() {
  navigateTo('oracle')
}

</script>

<template>
    <div class="text-center d-flex flex-column title-image">
        <BContainer class="py-5 my-5">
            <BRow>
                <BCol class="text-center">
                    <h1 class="display-1 mb-4 oracle-heading">Oopsie Oracle</h1>
                </BCol>
            </BRow>
            <BRow class="mb-5">
                <BCol>
                    <p class="h4 text-light px-3 px-md-0">
                        Ask your deeply concerned questions and he shall answer them with great expertise!
                    </p>
                    <p v-if="loggedIn" class="h4 text-light px-3 px-md-0">
                        Welcome back, {{ user?.username }}
                    </p>
                </BCol>
            </BRow>
        </BContainer>
    </div>
    <div>
        <p class="text-center text-light mt-5 description">
            This chat bot site features the Oopsie Oracle, a unique advice-giving AI that prides itself on delivering
            incredibly unhelpful, blunt, and often hilarious suggestions.
            The Oracle confidently sources its wisdom from poorly rated online forums and offers the most universally
            disliked or controversial takes on any question, maintaining a serious, non-sarcastic tone throughout.
            Expect brief, internet-style responses focused on humorously bad decision-making, and if you thank it, it
            will surely remind you of its unparalleled genius and absolute correctness, encouraging you to seek its
            "expert" guidance again.
        </p>
    </div>
    <BRow class="justify-content-center mt-5">
        <BCol cols="12" md="auto" class="d-flex flex-column flex-md-row gap-3 align-items-center">
            <button @click="signUp" class="home-page-buttons">
                Sign Up
            </button>
            <button v-if="!loggedIn" @click="signIn" class="home-page-buttons">
                Sign In
            </button>
            <button v-if="loggedIn" @click="oracle" class="home-page-buttons">
                Oracle
            </button>
        </BCol>
    </BRow>
</template>
