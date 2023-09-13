<template>
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
                            <h6 class="text-warning text-sm">Work In Progress => Some functionality can not work!</h6>
                        </div>
                        <div class="mb-5 text-start">
                            This tool is a web application where a GM can manage multiples games.
                            <br>
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
                            <NuxtLink class="btn btn-outline btn-secondary ml-2">here</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
