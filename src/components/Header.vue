<script lang="ts" setup>
const { loggedIn, logout } = useAuth();
const { changeTheme, list_themes, theme: usedTheme } = useTheme();
</script>

<template>
    <nav class="bg-base-300 navbar">
        <NuxtLink to="/" class="navbar-start">
            <span class="text-3xl font-semibold">
                RPG Game master tool manager</span>
        </NuxtLink>
        <div class="navbar-end gap-2">
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <NuxtLink to="/" class="btn btn-ghost" aria-current="page">Home</NuxtLink>
                <NuxtLink to="/games" class="btn btn-ghost">Games Managment</NuxtLink>
            </template>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Theme</label>
                <div tabindex="0"
                    class="menu dropdown-content z-[2] p-2 shadow bg-base-200 rounded-box w-52 mt-4 overflow-auto max-h-64">
                    <ul>
                        <li v-for="themeCategory in list_themes">
                            <details>
                                <summary>{{ themeCategory[0] }}</summary>
                                <ul>
                                    <li v-for="theme in themeCategory" @click="changeTheme(theme)" class="rounded-box"
                                        v-bind:class="theme == usedTheme ? 'bg-base-100' : ''"><a>{{ theme }}</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <template v-if="loggedIn">
                    <button class="btn btn-outline" @click="logout">Logout</button>
                </template>
                <template v-else>
                    <NuxtLink class="btn btn-success" to="/auth/login">Login</NuxtLink>
                </template>
            </template>
        </div>
    </nav>
</template>
