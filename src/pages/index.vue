<script setup lang="ts">
    const notifs = useNotif();

    // notifs.addNotif(new Notif({type: NotifType.info, title: 'Welcome to the tool for help Game Master (GM) to manage their games', timeout:1000, visibleInProd: false}))
    // notifs.addNotif(new Notif({type: NotifType.error, title: 'Welcome to the tool for help Game Master (GM) to manage their games', timeout:1000, visibleInProd: false}))
    // notifs.addNotif(new Notif({type: NotifType.warning, title: 'Welcome to the tool for help Game Master (GM) to manage their games', timeout:1000, visibleInProd: false}))
    // notifs.addNotif(new Notif({type: NotifType.success, title: 'Welcome to the tool for help Game Master (GM) to manage their games', timeout:1000, visibleInProd: false}))
</script>

<template>
    <div>
        <NuxtLayout>
            <div class="hero h-full">
                <div class="hero-content text-center block">
                    <h1 class="text-2xl font-semibold mt-8 mb-4">
                        Welcome on the tool for help Game Master (GM) to manage their games
                    </h1>
                    <div class="card bg-base-200 shadow-lg">
                        <div class="card-body">
                            <div class="card-title block text-start">
                                <h2>What is it ?</h2>
                            </div>

                            <div class="mb-5 text-start">
                                <div class="alert alert-warning">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>Work In Progress => Some functionality can not work!</span>
                                </div>
                                This tool is a web application where a GM can manage multiples games.
                                <br />
                                For managing a game, the GM can :
                                <ul class="list-disc ml-5">
                                    <li>Create a game</li>
                                    <li>Add all NPC and monsters that he needs, with theirs characteristics.</li>
                                    <li>Create an event-map for the script of his game.</li>
                                    <li>Keep notes from each event that the players have done or are currently inside.</li>
                                </ul>
                                Have fun when use it ^^
                            </div>
                            <div class="card-actions justify-end items-center">
                                You can see our tutorial
                                <NuxtLink class="btn btn-outline btn-secondary ml-2 btn-disabled">here</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
