<template>
    <NuxtLayout>
        <div class="h-full">
            <div class="flex items-center justify-center">
                <h1 class="text-x1 font-semibold text-info mt-8 mb-4">
                    Welcome on the tool for help Game Master (GM) to manage their games
                </h1>
            </div>
            <div class="flex items-center justify-center">
                <div class="card bg-base-300 shadow-lg">
                    <div class="card-body">
                        <div class="card-actions">
                            <h2>What is it ?</h2>
                        </div>
                        <div class="mb-5">
                            This tool is a web application where a GM can manage multiles games.
                            <br>
                            For managing a game, the GM can
                            <ul>
                                <li>Create a game</li>
                                <li>Add all NPC and monsters that he need, with theirs characteristics.</li>
                                <li>Create an event-map for the script of his game.</li>
                                <li>Keep notes from each event that the players have done or are currently inside.</li>
                            </ul>
                            <p class=" flex flex-row text-center items-center">You can see our tutorial
                                <NuxtLink class="btn btn-outline btn-secondary ml-2">here</NuxtLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
