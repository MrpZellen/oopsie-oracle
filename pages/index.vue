<script setup lang="ts">
import type { NavigationGuard } from 'vue-router'

definePageMeta({
  middleware: ["authenticated"] as unknown as NavigationGuard[],
})
  
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
    <div class="text-center">
        <BContainer class="my-5">
            <BRow>
                <BCol class="text-center">
                    <h1 class="display-1 mb-4 oracle-heading">Oopsie Oracle</h1>
                </BCol>
            </BRow>
        </BContainer>
        <p class="h4">
            Ask your deeply concerned questions and he shall answer them with great expertise!
        </p>
    </div>
</template>
