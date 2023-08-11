<script lang="ts" setup>
import VButton from '~/components/ui/Button.vue';
const { user, loggedIn, logout } = useAuth();
const { changeTheme } = setTheme();
</script>

<template>
    <nav class="border-primary-focus px-2 sm:px-4 py-2.5 bg-primary">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <NuxtLink to="/" class="flex items-center">
                <span class="self-center text-xl font-semibold whitespace-nowrap text-primary-content">RPG Game master tool
                    manager</span>
            </NuxtLink>
            <div class="flex items-center justify-center">
                <ul class="flex flex-row align-baseline py-4 gap-x-4 font-medium">
                    <li>
                        <NuxtLink to="/" class="nav-link" aria-current="page">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard" class="nav-link">Dashboard</NuxtLink>
                    </li>
                    <li class="dropdown">
                        <label tabindex="0">Theme</label>
                        <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
                            <li><a @click="changeTheme('light')">Light</a></li>
                            <li><a @click="changeTheme('dark')">Dark</a></li>
                            <li><a @click="changeTheme('night')">Night</a></li>
                        </ul>
                    </li>
                </ul>
                <ClientOnly>
                    <div class="flex gap-x-2 ml-5">
                        <template v-if="loggedIn">
                            <VButton class="!mb-0 btn-error" @click="logout">Logout</VButton>
                        </template>
                        <template v-else>
                            <NuxtLink class="btn btn-success" to="/auth/login">Login</NuxtLink>
                        </template>
                    </div>
                </ClientOnly>
            </div>
        </div>
    </nav>
</template>
