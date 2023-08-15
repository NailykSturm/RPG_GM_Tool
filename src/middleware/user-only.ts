export default defineNuxtRouteMiddleware(async (context) => {
    const { loggedIn } = useAuth();
    console.log('user-only middleware');
    console.log(loggedIn.value);
    if (!loggedIn.value) return await navigateTo('/');
});
