export default defineNuxtRouteMiddleware((to, from) => {
    const { userRole, isAuthenticated } = useAuth()

    // 認証チェック
    if (!isAuthenticated.value) {
        return navigateTo('/login')
    }

    // 全チケット一覧はサポート担当のみアクセス可能
    if (to.path === '/all-tickets' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    // ダッシュボードはサポート担当のみアクセス可能
    if (to.path === '/dashboard' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    // 一般ユーザーのアクセス制限
    if (userRole.value === 'user') {
        const allowedPaths = ['/inquiry', '/tickets', '/login', '/settings/theme']
        const isAllowed = allowedPaths.some(path => to.path.startsWith(path))

        if (!isAllowed) {
            return navigateTo('/tickets')
        }
    }

    // 承認者のアクセス制限
    if (userRole.value === 'approver') {
        const restrictedPaths = ['/settings/form', '/settings/routing', '/settings/sla', '/dashboard']
        const isRestricted = restrictedPaths.some(path => to.path.startsWith(path))

        if (isRestricted) {
            return navigateTo('/tickets')
        }
    }
})