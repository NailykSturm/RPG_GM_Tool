<script lang="ts" setup>
import VButton from '~/components/ui/Button.vue';

const { loggedIn, logout } = useAuth();
const { changeTheme, list_themes } = useTheme();
</script>

<template>
    <nav class="bg-primary navbar">
        <NuxtLink to="/" class="navbar-start">
            <span class="text-3xl font-semibold text-primary-content">
                RPG Game master tool manager</span>
        </NuxtLink>
        <div class="navbar-end gap-2">
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <NuxtLink to="/" class="btn btn-ghost" aria-current="page">Home</NuxtLink>
                <NuxtLink to="/games" class="btn btn-ghost">Games Managment</NuxtLink>
            </template>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Theme</label>
                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li v-for="theme in list_themes" @click="changeTheme(theme)"><a>{{ theme }}</a></li>
                </ul>
            </div>
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <template v-if="loggedIn">
                    <VButton class="btn-error" @click="logout">Logout</VButton>
                </template>
                <template v-else>
                    <NuxtLink class="btn btn-success" to="/auth/login">Login</NuxtLink>
                </template>
            </template>
        </div>
    </nav>
</template>
