export default defineNuxtRouteMiddleware((to) => {
  const { user, userRole } = useAuth()
  
  // ログインページ以外でログインしていない場合はログインページへ
  if (to.path !== '/login' && !user.value) {
    return navigateTo('/login')
  }
  
  // ログインページでログイン済みの場合は適切なページへリダイレクト
  if (to.path === '/login' && user.value) {
    if (userRole.value === 'support') {
      return navigateTo('/dashboard')
    } else {
      return navigateTo('/tickets')
    }
  }
  
  // ルートパス（/）にアクセスした場合の処理
  if (to.path === '/') {
    // ログインしている場合は適切なページへリダイレクト
    if (userRole.value === 'support') {
      return navigateTo('/dashboard')
    } else {
      return navigateTo('/tickets')
    }
  }
  
  // サポート担当以外がダッシュボードにアクセスしようとした場合
  if (to.path === '/dashboard') {
    if (userRole.value !== 'support') {
      return navigateTo('/tickets')
    }
  }
})