export default defineNuxtRouteMiddleware(async (to) => {
    const { user, checkAuth, userRole } = useAuth()

    // ログインページは認証チェックをスキップ
    if (to.path === '/login') {
        // 既にログインしている場合は適切なページへリダイレクト
        if (user.value) {
            if (userRole.value === 'support') {
                return navigateTo('/dashboard')
            } else {
                return navigateTo('/tickets')
            }
        }
        return
    }

    // 認証が必要なページの場合
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
        // ログインしていない場合はログインページへ
        return navigateTo('/login')
    }

    // ルートパス（/）にアクセスした場合の処理
    if (to.path === '/') {
        if (userRole.value === 'support') {
            return navigateTo('/dashboard')
        } else {
            return navigateTo('/tickets')
        }
    }

    // アクセス権限チェック
    // サポート担当以外がダッシュボードにアクセスしようとした場合
    if (to.path === '/dashboard' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    // サポート担当以外が全チケット一覧にアクセスしようとした場合
    if (to.path === '/all-tickets' && userRole.value !== 'support') {
        return navigateTo('/tickets')
    }

    // 一般ユーザーのアクセス制限
    if (userRole.value === 'user') {
        const allowedPaths = ['/inquiry', '/tickets', '/settings/theme']
        const isAllowed = allowedPaths.some(path => to.path.startsWith(path))

        if (!isAllowed) {
            return navigateTo('/tickets')
        }
    }

    // 承認者のアクセス制限
    if (userRole.value === 'approver') {
        const restrictedPaths = ['/settings/form', '/settings/routing', '/settings/sla']
        const isRestricted = restrictedPaths.some(path => to.path.startsWith(path))

        if (isRestricted) {
            return navigateTo('/tickets')
        }
    }
})