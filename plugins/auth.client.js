export default defineNuxtPlugin(async () => {
    const { checkAuth } = useAuth()

    // アプリケーション起動時に認証状態をチェック
    await checkAuth()
})