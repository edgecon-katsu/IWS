import { ref, computed } from 'vue'

const currentUser = ref(null)
const isAuthenticated = ref(false)
const loading = ref(false)

export function useAuth() {
    const { $fetch } = useNuxtApp()

    const login = async (email, password) => {
        loading.value = true
        try {
            const response = await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password }
            })

            if (response.user) {
                // トークンをCookieに保存
                const tokenCookie = useCookie('auth-token', {
                    httpOnly: false, // クライアントサイドでも読めるように
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 7 // 7日間
                })
                tokenCookie.value = response.token

                currentUser.value = response.user
                isAuthenticated.value = true

                return { success: true, user: response.user }
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
        if (!token.value) {
            isAuthenticated.value = false
            currentUser.value = null
            return false
        }

        try {
            const response = await $fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })

            if (response.user) {
                currentUser.value = response.user
                isAuthenticated.value = true
                return true
            }
        } catch (error) {
            console.error('Auth check error:', error)
            isAuthenticated.value = false
            currentUser.value = null
            const tokenCookie = useCookie('auth-token')
            tokenCookie.value = null
            return false
        }
    }

    const logout = async () => {
        loading.value = true
        try {
            const token = useCookie('auth-token')
            if (token.value) {
                await $fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
            }
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            currentUser.value = null
            isAuthenticated.value = false
            const tokenCookie = useCookie('auth-token')
            tokenCookie.value = null
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

    // 既存の computed properties
    const user = computed(() => currentUser.value)

    const userRole = computed(() => {
        if (!currentUser.value) return 'user'
        // roleフィールドがある場合はそれを使用
        if (currentUser.value.role) return currentUser.value.role
        // なければメールアドレスから判定（後方互換性）
        const email = currentUser.value.email
        if (email === 'support@zwei.com') return 'support'
        if (email === 'yamada@zwei.com') return 'approver'
        return 'user'
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