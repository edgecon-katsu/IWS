<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">マイチケット</h1>
        <p class="text-gray-600">自分が起票したチケットの一覧です。</p>
      </div>
      <router-link to="/inquiry/new" class="iws-btn-primary">
        <PlusCircleIcon class="mr-2 h-4 w-4" />
        新規問い合わせ
      </router-link>
    </div>

    <!-- チケット一覧 -->
    <div class="iws-card">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>チケット番号</th>
              <th>件名</th>
              <th>カテゴリ</th>
              <th>優先度</th>
              <th>状態</th>
              <th>起票日</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              @click="goToTicket('IWS-2025-000489')"
              class="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <td>
                <code class="text-sm font-mono">#IWS-2025-000489</code>
              </td>
              <td>
                <div class="font-medium">Outlook送受信不可</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">
                  9/2 14:05、PC EC-A123でOutlook起動時"0x80040154"
                </div>
              </td>
              <td>
                <div class="badge badge-outline badge-sm">EUS</div>
              </td>
              <td>
                <div class="priority-badge-p2">P2</div>
              </td>
              <td>
                <div class="status-badge-in-progress">進行中</div>
              </td>
              <td>2025/01/02</td>
            </tr>
            <tr 
              @click="goToTicket('IWS-2025-000473')"
              class="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <td>
                <code class="text-sm font-mono">#IWS-2025-000473</code>
              </td>
              <td>
                <div class="font-medium">店舗12 Wi-Fi全断</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">
                  店舗12のWi-Fiが全断。顧客対応に支障。
                </div>
              </td>
              <td>
                <div class="badge badge-outline badge-sm">保守 — ネットワーク</div>
              </td>
              <td>
                <div class="priority-badge-p1">P1</div>
              </td>
              <td>
                <div class="status-badge-completed">完了</div>
              </td>
              <td>2025/01/01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PlusCircleIcon, 
} from '@heroicons/vue/24/outline'

const goToTicket = (ticketId) => {
  navigateTo(`/tickets/${ticketId}`)
}</script>