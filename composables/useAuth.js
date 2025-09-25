import { ref, computed } from 'vue'

const currentUser = ref(null)
const isAuthenticated = ref(false)
const loading = ref(false)

export function useAuth() {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl || 'http://localhost:9000'

    const login = async (email, password) => {
        loading.value = true
        try {
            const response = await $fetch(`${apiBaseUrl}/api/auth/login`, {
                method: 'POST',
                body: { email, password },
                credentials: 'include'
            })

            if (response.status === 'success' && response.user) {
                currentUser.value = response.user
                isAuthenticated.value = true

                if (response.token) {
                    const tokenCookie = useCookie('auth-token', {
                        httpOnly: false,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 60 * 60 * 24 * 7
                    })
                    tokenCookie.value = response.token
                }

                const userIdCookie = useCookie('user-id', {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 7
                })
                userIdCookie.value = response.user.userId

                return { success: true, user: response.user }
            } else {
                return { success: false, error: response.message || 'ログインに失敗しました' }
            }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: error.data?.message || 'ログインに失敗しました' }
        } finally {
            loading.value = false
        }
    }

    const checkAuth = async () => {
        const token = useCookie('auth-token')
        const userId = useCookie('user-id')
        const config = useRuntimeConfig()
        const apiBaseUrl = config.public.apiBaseUrl || 'http://localhost:9000'

        if (!token.value && !userId.value) {
            isAuthenticated.value = false
            currentUser.value = null
            return false
        }

        try {
            const headers = token.value
                ? { 'Authorization': `Bearer ${token.value}` }
                : {}

            const response = await $fetch(`${apiBaseUrl}/api/auth/me`, {
                headers,
                credentials: 'include'
            })

            if (response.user) {
                currentUser.value = response.user
                isAuthenticated.value = true
                return true
            }
        } catch (error) {
            console.error('Auth check error:', error)
            if (userId.value && currentUser.value) {
                isAuthenticated.value = true
                return true
            }

            isAuthenticated.value = false
            currentUser.value = null
            const tokenCookie = useCookie('auth-token')
            const userIdCookie = useCookie('user-id')
            tokenCookie.value = null
            userIdCookie.value = null
            return false
        }
    }

    const logout = async () => {
        loading.value = true
        const config = useRuntimeConfig()
        const apiBaseUrl = config.public.apiBaseUrl || 'http://localhost:9000'

        try {
            const token = useCookie('auth-token')
            if (token.value) {
                await $fetch(`${apiBaseUrl}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    },
                    credentials: 'include'
                })
            }
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            currentUser.value = null
            isAuthenticated.value = false
            const tokenCookie = useCookie('auth-token')
            const userIdCookie = useCookie('user-id')
            tokenCookie.value = null
            userIdCookie.value = null
            loading.value = false
            await navigateTo('/login')
        }
    }

    const setUser = (userData) => {
        currentUser.value = userData
        if (userData) {
            isAuthenticated.value = true
        }
    }

    const user = computed(() => currentUser.value)

    const userRole = computed(() => {
        if (!currentUser.value) return 'user'
        return currentUser.value.role || 'user'
    })

    const canViewAllTickets = computed(() => userRole.value === 'support')
    const canApprove = computed(() => userRole.value === 'approver' || userRole.value === 'support')
    const canManageSettings = computed(() => userRole.value === 'support')

    return {
        user,
        isAuthenticated: computed(() => isAuthenticated.value),
        loading: computed(() => loading.value),
        userRole,
        login,
        logout,
        checkAuth,
        setUser,
        canViewAllTickets,
        canApprove,
        canManageSettings
    }
}