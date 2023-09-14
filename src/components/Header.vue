<script lang="ts" setup>
const { loggedIn, logout } = useAuth();
const { changeTheme, list_themes, theme: usedTheme } = useTheme();
</script>

<template>
    <nav class="bg-primary navbar">
        <NuxtLink to="/" class="navbar-start">
            <span class="text-3xl font-semibold text-primary-content">
                RPG Game master tool manager</span>
        </NuxtLink>
        <div class="navbar-end gap-2 text-primary-content">
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <NuxtLink to="/" class="btn btn-ghost" aria-current="page">Home</NuxtLink>
                <NuxtLink to="/games" class="btn btn-ghost">Games Managment</NuxtLink>
            </template>
            <div class="dropdown dropdown-end text-secondary-content">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Theme</label>
                <ul tabindex="0"
                    class="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-52 mt-4 overflow-auto max-h-min">
                    <li v-for="themeCategory in list_themes">
                        <details>
                            <summary>{{ themeCategory[0] }}</summary>
                            <ul>
                                <li v-for="theme in themeCategory" @click="changeTheme(theme)" class="rounded-box"
                                    v-bind:class="theme == usedTheme ? 'bg-secondary' : ''"><a>{{ theme }}</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <template v-if="useRoute().fullPath.split('/')[1] !== 'auth'">
                <template v-if="loggedIn">
                    <button class="btn btn-error" @click="logout">Logout</button>
                </template>
                <template v-else>
                    <NuxtLink class="btn btn-success" to="/auth/login">Login</NuxtLink>
                </template>
            </template>
        </div>
    </nav>
</template>
