<template>
  <div class="iws-card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">やり取り履歴</h2>
      <div class="text-sm text-gray-500">{{ messages.length }}件のメッセージ</div>
    </div>
    
    <!-- チャット履歴 -->
    <div class="space-y-4 max-h-96 overflow-y-auto mb-6" ref="chatContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="flex items-start space-x-3"
        :class="{ 'flex-row-reverse space-x-reverse': message.isCurrentUser }"
      >
        <!-- アバター -->
        <div class="avatar placeholder flex-shrink-0">
          <div 
            class="rounded-full w-8 h-8 text-xs font-bold"
            :class="getAvatarClass(message.userRole, message.isCurrentUser)"
          >
            <span>{{ message.userName.charAt(0) }}</span>
          </div>
        </div>
        
        <!-- メッセージ内容 -->
        <div class="flex-1 max-w-xs sm:max-w-md">
          <div 
            class="rounded-lg p-3 break-words"
            :class="getMessageClass(message.userRole, message.isCurrentUser)"
          >
            <div class="flex items-center justify-between mb-1">
              <div class="font-medium text-sm">{{ message.userName }}</div>
              <div class="text-xs opacity-75">{{ formatTime(message.timestamp) }}</div>
            </div>
            <div class="text-sm whitespace-pre-wrap">{{ message.content }}</div>
            
            <!-- 添付ファイル -->
            <div v-if="message.attachments && message.attachments.length > 0" class="mt-2">
              <div 
                v-for="file in message.attachments" 
                :key="file.id"
                class="flex items-center space-x-2 text-xs opacity-75 hover:opacity-100 cursor-pointer"
              >
                <PaperClipIcon class="h-3 w-3" />
                <span>{{ file.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 入力中インジケーター -->
      <div v-if="isTyping" class="flex items-start space-x-3">
        <div class="avatar placeholder">
          <div class="bg-gray-300 text-gray-600 rounded-full w-8 h-8">
            <span class="text-xs">...</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-lg p-3">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 返信フォーム -->
    <div class="border-t pt-4">
      <div class="flex items-start space-x-3">
        <div class="avatar placeholder">
          <div class="bg-primary text-primary-content rounded-full w-8 h-8">
            <span class="text-xs">{{ currentUser?.name?.charAt(0) || 'U' }}</span>
          </div>
        </div>
        <div class="flex-1">
          <textarea 
            v-model="newMessage"
            @keydown="handleKeydown"
            @input="handleTyping"
            class="iws-textarea resize-none"
            rows="3"
            placeholder="返信を入力してください... (Ctrl+Enterで送信)"
            :disabled="sending"
          ></textarea>
          
          <!-- 添付ファイル -->
          <div v-if="attachments.length > 0" class="mt-2">
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(file, index) in attachments" 
                :key="index"
                class="flex items-center space-x-2 bg-gray-100 rounded px-2 py-1 text-sm"
              >
                <PaperClipIcon class="h-3 w-3" />
                <span>{{ file.name }}</span>
                <button @click="removeAttachment(index)" class="text-error hover:text-error-focus">
                  <XMarkIcon class="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center space-x-2">
              <input 
                ref="fileInput"
                type="file" 
                multiple 
                @change="handleFileSelect"
                class="hidden"
              />
              <button 
                @click="$refs.fileInput.click()"
                class="btn btn-ghost btn-sm"
                :disabled="sending"
              >
                <PaperClipIcon class="h-4 w-4 mr-1" />
                添付
              </button>
              <div class="text-xs text-gray-500">
                {{ newMessage.length }}/1000文字
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button 
                @click="saveDraft"
                class="btn btn-ghost btn-sm"
                :disabled="!newMessage.trim() || sending"
              >
                <DocumentIcon class="h-4 w-4 mr-1" />
                下書き保存
              </button>
              <button 
                @click="sendMessage"
                class="btn btn-primary btn-sm"
                :disabled="!newMessage.trim() || sending"
              >
                <span v-if="sending" class="loading loading-spinner loading-sm mr-1"></span>
                <PaperAirplaneIcon v-else class="h-4 w-4 mr-1" />
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PaperClipIcon, 
  XMarkIcon, 
  DocumentIcon, 
  PaperAirplaneIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  ticketId: {
    type: String,
    required: true
  }
})

const { user: currentUser } = useAuth()

const newMessage = ref('')
const sending = ref(false)
const isTyping = ref(false)
const attachments = ref([])
const chatContainer = ref(null)

let typingTimer = null

// サンプルメッセージデータ
const messages = ref([
  {
    id: 1,
    userName: '田中太郎',
    userRole: 'user',
    content: 'Outlook送受信不可の問題が発生しています。PC EC-A123でOutlook起動時に"0x80040154"エラーが表示されます。昨日Windows更新を行いました。',
    timestamp: new Date('2025-01-02T14:05:00'),
    isCurrentUser: currentUser.value?.name === '田中太郎',
    attachments: []
  },
  {
    id: 2,
    userName: 'サポート担当',
    userRole: 'support',
    content: 'Windows更新の影響と思われます。Outlookの再インストールを試してください。以下の手順で実行してください：\n\n1. コントロールパネル > プログラムと機能\n2. Microsoft Office を選択\n3. 変更 > クイック修復',
    timestamp: new Date('2025-01-02T15:30:00'),
    isCurrentUser: currentUser.value?.name === 'サポート担当',
    attachments: []
  },
  {
    id: 3,
    userName: '田中太郎',
    userRole: 'user',
    content: 'クイック修復を実行しましたが、まだ同じエラーが発生します。他に試せる方法はありますか？',
    timestamp: new Date('2025-01-02T16:15:00'),
    isCurrentUser: currentUser.value?.name === '田中太郎',
    attachments: []
  },
  {
    id: 4,
    userName: 'サポート担当',
    userRole: 'support',
    content: '承知しました。Outlookプロファイルの再作成を試してみましょう。リモートでサポートしますので、Teams会議を設定いたします。',
    timestamp: new Date('2025-01-02T16:45:00'),
    isCurrentUser: currentUser.value?.name === 'サポート担当',
    attachments: [
      { id: 1, name: 'outlook_profile_setup.pdf' }
    ]
  }
])

// アバターのクラス
const getAvatarClass = (userRole, isCurrentUser) => {
  if (isCurrentUser) {
    return 'bg-primary text-primary-content'
  }
  
  const classes = {
    'user': 'bg-info text-info-content',
    'support': 'bg-success text-success-content',
    'approver': 'bg-warning text-warning-content'
  }
  return classes[userRole] || 'bg-gray-300 text-gray-600'
}

// メッセージのクラス
const getMessageClass = (userRole, isCurrentUser) => {
  if (isCurrentUser) {
    return 'bg-primary text-primary-content ml-auto'
  }
  
  const classes = {
    'user': 'bg-gray-100',
    'support': 'bg-green-50 border border-green-200',
    'approver': 'bg-yellow-50 border border-yellow-200'
  }
  return classes[userRole] || 'bg-gray-100'
}

// 時間フォーマット
const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  
  if (minutes < 1) return 'たった今'
  if (minutes < 60) return `${minutes}分前`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}時間前`
  
  return timestamp.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// キーボードイベント
const handleKeydown = (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

// 入力中の処理
const handleTyping = () => {
  isTyping.value = true
  
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
  
  typingTimer = setTimeout(() => {
    isTyping.value = false
  }, 1000)
}

// ファイル選択
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (file.size <= 10 * 1024 * 1024) { // 10MB制限
      attachments.value.push(file)
    } else {
      alert(`${file.name} は10MBを超えているため添付できません`)
    }
  })
  event.target.value = '' // リセット
}

// 添付ファイル削除
const removeAttachment = (index) => {
  attachments.value.splice(index, 1)
}

// メッセージ送信
const sendMessage = async () => {
  if (!newMessage.value.trim() || sending.value) return
  
  sending.value = true
  
  try {
    // 新しいメッセージを追加
    const message = {
      id: messages.value.length + 1,
      userName: currentUser.value?.name || 'ユーザー',
      userRole: currentUser.value?.role || 'user',
      content: newMessage.value,
      timestamp: new Date(),
      isCurrentUser: true,
      attachments: attachments.value.map((file, index) => ({
        id: index + 1,
        name: file.name
      }))
    }
    
    messages.value.push(message)
    
    // フォームリセット
    newMessage.value = ''
    attachments.value = []
    
    // チャットを最下部にスクロール
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
    
    // サーバーに送信（実装時）
    console.log('メッセージ送信:', message)
    
  } catch (error) {
    console.error('メッセージ送信エラー:', error)
    alert('メッセージの送信に失敗しました')
  } finally {
    sending.value = false
  }
}

// 下書き保存
const saveDraft = () => {
  if (!newMessage.value.trim()) return
  
  localStorage.setItem(`draft_${props.ticketId}`, newMessage.value)
  alert('下書きを保存しました')
}

// 下書き読み込み
const loadDraft = () => {
  const draft = localStorage.getItem(`draft_${props.ticketId}`)
  if (draft) {
    newMessage.value = draft
  }
}

// 初期化時に下書きを読み込み
onMounted(() => {
  loadDraft()
  
  // チャットを最下部にスクロール
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

// コンポーネント破棄時にタイマーをクリア
onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
})
</script>