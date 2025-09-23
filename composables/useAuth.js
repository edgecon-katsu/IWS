import { ref, computed } from 'vue'

// ユーザー情報の管理
const currentUser = ref(null)

export function useAuth() {
  const user = computed(() => currentUser.value)
  
  const userRole = computed(() => {
    if (!currentUser.value) return 'user'
    const email = currentUser.value.email
    if (email === 'support@zwei.com') return 'support'
    if (email === 'yamada@zwei.com') return 'approver'
    return 'user'
  })
  
  const setUser = (userData) => {
    currentUser.value = userData
  }
  
  const canViewAllTickets = computed(() => userRole.value === 'support')
  const canApprove = computed(() => userRole.value === 'approver' || userRole.value === 'support')
  const canManageSettings = computed(() => userRole.value === 'support')
  
  return {
    user,
    userRole,
    setUser,
    canViewAllTickets,
    canApprove,
    canManageSettings
  }
}