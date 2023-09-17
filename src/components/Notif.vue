<script setup lang="ts">

const notif = useNotif();

</script>

<template>
    <div class="toast toast-bottom toast-end">
        <div v-for="notification in notif.listNotifs.value" class="block alert" v-bind:class="'alert-'+notification.type">
            <h3 class="text-lg">{{ notification.title }}</h3>
            <div>{{ notification.message }}</div>

            <!-- <div class="alert alert-success block">
                <div>{{ notification.title }}</div>
                <div>{{ notification.message }}</div>
                <div>{{ notification.type }}</div>
            </div> -->
        </div>
    </div>
</template>