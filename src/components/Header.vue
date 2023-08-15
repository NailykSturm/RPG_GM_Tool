<script lang="ts" setup>
import VButton from '~/components/ui/Button.vue';

const { user, loggedIn, logout } = useAuth();
const { changeTheme, list_themes } = setTheme();
</script>

<template>
    <nav class="bg-primary px-4 flex flex-wrap items-center">
        <div class="container flex flex-wrap justify-between ">
            <NuxtLink to="/" class="flex">
                <span class="self-center text-3xl font-semibold text-primary-content">
                    RPG Game master tool manager</span>
            </NuxtLink>
            <div class="flex items-center justify-center" v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <ul class="flex flex-row align-baseline py-4 gap-x-4 font-medium">
                    <li>
                        <NuxtLink to="/" class="nav-link" aria-current="page">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/games" class="nav-link">Games Managment</NuxtLink>
                    </li>
                    <li class="dropdown dropdown-end">
                        <label tabindex="0">Theme</label>
                        <div class="dropdown-content h-64 overflow-y-auto z-[1]">
                            <ul tabindex="0" class="menu p-2 shadow bg-base-100 rounded-box w-32 mt-4">
                                <li v-for="theme in list_themes">
                                    <a @click="changeTheme(theme)">{{ theme }}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div class="flex gap-x-2 ml-5">
                    <template v-if="loggedIn">
                        <VButton class="!mb-0 btn-error" @click="logout">Logout</VButton>
                    </template>
                    <template v-else>
                        <NuxtLink class="btn btn-success" to="/auth/login">Login</NuxtLink>
                    </template>
                </div>
            </div>
            <div v-else class="flex items-center justify-center">
                <ul class="flex flex-row align-baseline py-4 gap-x-4 font-medium">
                    <li class="dropdown dropdown-end">
                        <label tabindex="0">Theme</label>
                        <div class="dropdown-content h-64 overflow-y-auto z-[1]">
                            <ul tabindex="0" class="menu p-2 shadow bg-base-100 rounded-box w-32 mt-4">
                                <li v-for="theme in list_themes">
                                    <a @click="changeTheme(theme)">{{ theme }}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
