<script setup lang="ts">

const notif = useNotif();

</script>

<template>
    <div class="toast toast-bottom toast-end">
        <template v-for="notification in notif.listNotifs.value">
            <div class="block alert" :class="'alert-'+notification.type">
            <h3 class="text-lg">{{ notification.title }}</h3>
            <div>{{ notification.message }}</div>

            <!-- <div class="alert alert-error block">
                <div>{{ notification.title }}</div>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div> -->
        </div>
        </template>
    </div>
</template>