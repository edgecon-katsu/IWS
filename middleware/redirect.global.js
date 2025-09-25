export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { user, userRole, isAuthenticated } = useAuth()

    if (to.path === '/login') {
        if (isAuthenticated.value && user.value) {
            if (userRole.value === 'support') {
                return navigateTo('/dashboard')
            } else {
                return navigateTo('/tickets')
            }
        }
        return
    }

    if (!isAuthenticated.value) {
        return navigateTo('/login')
    }

    if (to.path === '/') {
        if (userRole.value === 'support') {
            return navigateTo('/dashboard')
        } else {
            return navigateTo('/tickets')
        }
    }

    if (to.path === '/dashboard' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    if (to.path === '/all-tickets' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    if (userRole.value === 'user') {
        const allowedPaths = ['/inquiry', '/tickets', '/settings/theme']
        const isAllowed = allowedPaths.some(path => to.path.startsWith(path))

        if (!isAllowed) {
            return navigateTo('/tickets')
        }
    }

    if (userRole.value === 'approver') {
        const restrictedPaths = ['/settings/form', '/settings/routing', '/settings/sla']
        const isRestricted = restrictedPaths.some(path => to.path.startsWith(path))

        if (isRestricted) {
            return navigateTo('/tickets')
        }
    }
})