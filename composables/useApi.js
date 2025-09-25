export function useApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:9000'

    const apiFetch = $fetch.create({
        baseURL,
        onRequest({ request, options }) {
            // 認証トークンを自動的に付与
            const token = useCookie('auth-token')
            if (token.value) {
                options.headers = options.headers || {}
                options.headers.authorization = `Bearer ${token.value}`
            }
        },
        onResponseError({ response }) {
            // 401エラーの場合は自動的にログイン画面へ
            if (response.status === 401) {
                const { logout } = useAuth()
                logout()
            }
        }
    })

    return {
        get: (url, options = {}) => apiFetch(url, { ...options, method: 'GET' }),
        post: (url, body, options = {}) => apiFetch(url, { ...options, method: 'POST', body }),
        put: (url, body, options = {}) => apiFetch(url, { ...options, method: 'PUT', body }),
        patch: (url, body, options = {}) => apiFetch(url, { ...options, method: 'PATCH', body }),
        delete: (url, options = {}) => apiFetch(url, { ...options, method: 'DELETE' })
    }
}