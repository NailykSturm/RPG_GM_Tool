<script setup lang="ts">

// import { NotifType, listNotif } from '~/composables/useNotif';
const notif = useNotif();


</script>

<template>
    <div class="toast toast-bottom toast-end">
        <div v-for="notification in notif.listNotifs.value">
            <div v-if="notification.type == 'error' && notification.display" class="alert block alert-error">
                <h3 class="text-lg">{{ notification.title }}</h3>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div>
            <div v-else-if="notification.type == 'info' && notification.display" class="alert block alert-info">

                <h3 class="text-lg">{{ notification.title }}</h3>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div>
            <div v-else-if="notification.type == 'success' && notification.display" class="alert block alert-success">
                <h3 class="text-lg">{{ notification.title }}</h3>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div>
            <div v-else-if="notification.type == 'warning' && notification.display" class="alert block alert-warning">
                <h3 class="text-lg">{{ notification.title }}</h3>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div>
        </div>
    </div>
</template>