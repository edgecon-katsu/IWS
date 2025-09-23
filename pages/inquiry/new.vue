<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">新規問い合わせ</h1>
      <p class="text-gray-600">問題やご要望を登録してください。適切なカテゴリを選択することで、迅速な対応が可能になります。</p>
    </div>

    <!-- ステップインジケーター -->
    <div class="mb-8">
      <ul class="steps steps-horizontal w-full">
        <li class="step step-primary">カテゴリ・対象</li>
        <li class="step">影響・緊急度</li>
        <li class="step">詳細入力</li>
        <li class="step">確認</li>
      </ul>
    </div>

    <!-- ステップ1: カテゴリ・対象選択 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-6">ステップ1: カテゴリ・対象選択</h2>
      
      <!-- 1. カテゴリ選択 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">1. カテゴリ</span>
        </label>
        <select v-model="form.category" @change="onCategoryChange" class="iws-select">
          <option value="">選択してください</option>
          <option 
            v-for="category in config.categories" 
            :key="category.value" 
            :value="category.value"
          >
            {{ category.label }} - {{ category.description }}
          </option>
        </select>
      </div>

      <!-- カテゴリ別詳細フォーム -->
      <div v-if="form.category" class="mb-8">
        <!-- EUS詳細フォーム -->
        <div v-if="form.category === 'EUS'" class="space-y-6">
          <!-- 目的 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">目的</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.EUS.purpose" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.purpose" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 端末 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">端末</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.EUS.device" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.device" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 症状 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">症状</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.EUS.symptoms" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.symptoms" 
                  type="checkbox" 
                  :value="option" 
                  class="checkbox checkbox-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 最近の変更 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">最近の変更</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.EUS.recentChanges" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.recentChanges" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 詳細情報 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">詳細情報</span>
            </label>
            <textarea 
              v-model="form.details.description"
              class="iws-textarea"
              rows="4"
              placeholder="詳細な状況を入力してください"
            ></textarea>
          </div>

          <!-- 添付 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">添付</span>
            </label>
            <input 
              type="file" 
              @change="handleFileUpload"
              class="file-input file-input-bordered w-full"
              multiple
              accept="*/*"
            />
            <div class="text-xs text-gray-500 mt-1">20MBまで</div>
          </div>
        </div>

        <!-- Z-CRM詳細フォーム -->
        <div v-if="form.category === 'Z-CRM'" class="space-y-6">
          <!-- 作業区分 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">作業区分</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms['Z-CRM'].workType" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.workType" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 対象区分 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">対象区分</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms['Z-CRM'].targetType" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.targetType" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- レコード特定 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">レコード特定（2つ以上必須）</span>
            </label>
            <div class="space-y-4">
              <div>
                <label class="label">
                  <span class="label-text text-sm">画面URL</span>
                </label>
                <input 
                  v-model="form.details.recordInfo.screenUrl"
                  type="url" 
                  class="iws-input"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">画面/タブ名</span>
                </label>
                <input 
                  v-model="form.details.recordInfo.screenName"
                  type="text" 
                  class="iws-input"
                  placeholder="画面名またはタブ名"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">氏名＋生年月日</span>
                </label>
                <input 
                  v-model="form.details.recordInfo.nameAndBirth"
                  type="text" 
                  class="iws-input"
                  placeholder="山田太郎 1990-01-01"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">会員番号/連絡先</span>
                </label>
                <input 
                  v-model="form.details.recordInfo.memberIdOrContact"
                  type="text" 
                  class="iws-input"
                  placeholder="会員番号または連絡先"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">発生日時</span>
                </label>
                <input 
                  v-model="form.details.recordInfo.occurredAt"
                  type="datetime-local" 
                  class="iws-input"
                />
              </div>
            </div>
          </div>

          <!-- スクリーンショット -->
          <div>
            <label class="label">
              <span class="label-text font-medium">スクリーンショット（任意）</span>
            </label>
            <input 
              type="file" 
              @change="handleFileUpload"
              class="file-input file-input-bordered w-full"
              multiple
              accept="image/*"
            />
            <div class="text-xs text-gray-500 mt-1">20MBまで</div>
          </div>
        </div>

        <!-- zwei.com詳細フォーム -->
        <div v-if="form.category === 'zwei.com'" class="space-y-6">
          <!-- 種類 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">種類</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms['zwei.com'].type" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.type" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- URL -->
          <div>
            <label class="label">
              <span class="label-text font-medium">URL</span>
            </label>
            <textarea 
              v-model="form.details.urls"
              class="iws-textarea"
              rows="3"
              placeholder="対象のURLを入力してください（複数の場合は改行で区切る）"
            ></textarea>
          </div>

          <!-- 端末 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">端末</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms['zwei.com'].device" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.device" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 公開希望（更新時） -->
          <div>
            <label class="label">
              <span class="label-text font-medium">公開希望（更新時）</span>
            </label>
            <input 
              v-model="form.details.publishDate"
              type="datetime-local" 
              class="iws-input"
            />
          </div>

          <!-- ブラウザ -->
          <div>
            <label class="label">
              <span class="label-text font-medium">ブラウザ</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms['zwei.com'].browser" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.browser" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 要素名 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">要素名</span>
            </label>
            <input 
              v-model="form.details.elementName"
              type="text" 
              class="iws-input"
              placeholder="対象の要素名を入力してください"
            />
          </div>

          <!-- 素材（更新時） -->
          <div>
            <label class="label">
              <span class="label-text font-medium">素材（更新時）</span>
            </label>
            <input 
              type="file" 
              @change="handleFileUpload"
              class="file-input file-input-bordered w-full"
              multiple
              accept="*/*"
            />
            <div class="text-xs text-gray-500 mt-1">20MBまで</div>
          </div>

          <!-- 詳細 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">詳細</span>
            </label>
            <textarea 
              v-model="form.details.description"
              class="iws-textarea"
              rows="4"
              placeholder="詳細な内容を入力してください"
            ></textarea>
          </div>
        </div>

        <!-- ネットワーク詳細フォーム -->
        <div v-if="form.category === 'network'" class="space-y-6">
          <!-- 拠点 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">拠点</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.network.location" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.location" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 機器 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">機器</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.network.equipment" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.equipment" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- 症状 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">症状</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.network.symptoms" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.symptoms" 
                  type="checkbox" 
                  :value="option" 
                  class="checkbox checkbox-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- ランプ -->
          <div>
            <label class="label">
              <span class="label-text font-medium">ランプ</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.network.lampStatus" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.lampStatus" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
            <!-- 不明選択時のファイル選択 -->
            <div v-if="form.details.lampStatus === '不明'" class="mt-4">
              <label class="label">
                <span class="label-text text-sm">ランプ状態の写真</span>
              </label>
              <input 
                type="file" 
                @change="handleFileUpload"
                class="file-input file-input-bordered w-full"
                accept="image/*"
              />
            </div>
          </div>

          <!-- 回線業者連絡 -->
          <div>
            <label class="label">
              <span class="label-text font-medium">回線業者連絡</span>
            </label>
            <div class="space-y-2">
              <label 
                v-for="option in categoryForms.network.carrierContact" 
                :key="option" 
                class="cursor-pointer flex items-center"
              >
                <input 
                  v-model="form.details.carrierContact" 
                  type="radio" 
                  :value="option" 
                  class="radio radio-primary mr-3"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 対象 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">2. 対象</span>
        </label>
        <div class="space-y-2">
          <label 
            v-for="target in config.targets" 
            :key="target.value" 
            class="cursor-pointer flex items-center"
          >
            <input 
              v-model="form.target" 
              type="radio" 
              :value="target.value" 
              class="radio radio-primary mr-3"
            />
            <span>{{ target.label }}</span>
          </label>
        </div>
      </div>

      <!-- 次へボタン -->
      <div class="flex justify-end">
        <button 
          @click="goToStep2"
          class="iws-btn-primary"
          :disabled="!form.category || !form.target"
        >
          次へ：影響・緊急度の設定
          <ArrowRightIcon class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
const categoryForms = config.public.inquiryForm.categoryForms

const form = ref({
  category: '',
  target: '',
  details: {
    // EUS用
    purpose: '',
    device: '',
    symptoms: [],
    recentChanges: '',
    description: '',
    
    // Z-CRM用
    workType: '',
    targetType: '',
    recordInfo: {
      screenUrl: '',
      screenName: '',
      nameAndBirth: '',
      memberIdOrContact: '',
      occurredAt: ''
    },
    
    // zwei.com用
    type: '',
    urls: '',
    publishDate: '',
    browser: '',
    elementName: '',
    
    // ネットワーク用
    location: '',
    equipment: '',
    lampStatus: '',
    carrierContact: ''
  },
  attachments: []
})

const onCategoryChange = () => {
  // カテゴリ変更時に詳細フォームをリセット
  form.value.details = {
    purpose: '',
    device: '',
    symptoms: [],
    recentChanges: '',
    description: '',
    workType: '',
    targetType: '',
    recordInfo: {
      screenUrl: '',
      screenName: '',
      nameAndBirth: '',
      memberIdOrContact: '',
      occurredAt: ''
    },
    type: '',
    urls: '',
    publishDate: '',
    browser: '',
    elementName: '',
    location: '',
    equipment: '',
    lampStatus: '',
    carrierContact: ''
  }
  form.value.attachments = []
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  const maxSize = 20 * 1024 * 1024 // 20MB
  
  files.forEach(file => {
    if (file.size <= maxSize) {
      form.value.attachments.push(file)
    } else {
      alert(`${file.name} は20MBを超えているため添付できません`)
    }
  })
}

const goToStep2 = () => {
  // フォームデータを保存してステップ2へ
  console.log('Form data:', form.value)
  navigateTo('/inquiry/step/2')
}
</script>