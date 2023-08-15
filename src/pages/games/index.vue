<script lang="ts" setup>
definePageMeta({
    middleware: 'user-only',
});
</script>

<template>
    <NuxtLayout>
        <!-- <div class="flex">
        <h1 class="flex-none">List of your games</h1>
        <div class="flex-1 p-4 bg-blue-500 text-white absolute">
            <Button class="btn btn-info mr-4">Add game</Button>
            <Button class="btn btn-error">Delete game</Button>
        </div>
    </div>
    <div>
        <ul>
            <li><NuxtLink to="/games/rpg1/bestiary">RPG1</NuxtLink></li>
            <li><NuxtLink to="/games/rpg2/bestiary">RPG2</NuxtLink></li>
            <li><NuxtLink to="/games/rpg3/bestiary">RPG3</NuxtLink></li>
            <li><NuxtLink to="/games/rpg4/bestiary">RPG4</NuxtLink></li>
        </ul>
    </div> -->
    </NuxtLayout>
</template>
