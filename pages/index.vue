<template>
  <div>
    <!-- アクションカード群 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <ActionCard
        title="新規問い合わせ"
        description="問題やご要望を新規登録"
        icon="plus-circle"
        color="primary"
        to="/inquiry/new"
        :stats="{ label: '今月', value: '24件' }"
      />
      <ActionCard
        title="マイチケット"
        description="自分の案件状況を確認"
        icon="ticket"
        color="info"
        to="/tickets"
        :stats="{ label: '進行中', value: '5件' }"
      />
      <ActionCard
        title="承認待ち"
        description="承認が必要な案件を処理"
        icon="clipboard-check"
        color="warning"
        to="/approvals"
        :stats="{ label: '承認待ち', value: '2件' }"
      />
      <ActionCard
        title="ダッシュボード"
        description="KPI・SLA監視"
        icon="chart"
        color="success"
        to="/dashboard"
        :stats="{ label: 'SLA', value: '99.92%' }"
      />
    </div>

    <!-- KPI サマリー -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- EUS消化状況 -->
      <div class="iws-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">EUS 消化状況</h3>
          <div class="badge badge-success">80h閾値達成済</div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span>今月消化時間</span>
            <span class="font-medium">72h / 100h</span>
          </div>
          <progress class="progress progress-primary w-full" value="72" max="100"></progress>
          <div class="text-xs text-gray-500">
            80h閾値に到達しています。超過時は事前合意が必要です。
          </div>
        </div>
      </div>

      <!-- Z-CRM消化状況 -->
      <div class="iws-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Z-CRM 消化状況</h3>
          <div class="badge badge-info">繰越残 16</div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span>今月使用</span>
            <span class="font-medium">64 / 80</span>
          </div>
          <progress class="progress progress-success w-full" value="64" max="80"></progress>
          <div class="text-xs text-gray-500">
            80到達後: 81-100=12,000円 / 101+=15,000円
          </div>
        </div>
      </div>

      <!-- P1緊急対応 -->
      <div class="iws-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">P1 緊急対応</h3>
          <div class="priority-badge-p1">P1</div>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-success">12分</div>
              <div class="text-xs text-gray-500">MTTA (平均応答)</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-success">1h45m</div>
              <div class="text-xs text-gray-500">MTTR (平均復旧)</div>
            </div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold">本日: 1件</div>
            <div class="text-xs text-error font-medium">
              緊急時電話: 03-xxxx-xxxx
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近のチケット -->
    <div class="iws-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">最近のチケット</h3>
        <router-link to="/tickets" class="text-primary hover:text-primary-focus text-sm">
          すべて見る →
        </router-link>
      </div>
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
            <tr>
              <td class="font-mono text-sm">#IWS-2025-000489</td>
              <td>Outlook送受信不可</td>
              <td>EUS</td>
              <td><div class="priority-badge-p2">P2</div></td>
              <td><div class="status-badge-in-progress">進行中</div></td>
              <td>2025/01/02</td>
            </tr>
            <tr>
              <td class="font-mono text-sm">#IWS-2025-000473</td>
              <td>店舗12 Wi-Fi全断</td>
              <td>保守 — ネットワーク</td>
              <td><div class="priority-badge-p1">P1</div></td>
              <td><div class="status-badge-completed">完了</div></td>
              <td>2025/01/01</td>
            </tr>
            <tr>
              <td class="font-mono text-sm">#IWS-2025-000462</td>
              <td>会員ランク誤り修正</td>
              <td>保守 — Z-CRM</td>
              <td><div class="priority-badge-p3">P3</div></td>
              <td><div class="status-badge-pending">承認待ち</div></td>
              <td>2024/12/31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// ログイン状態のチェックはmiddlewareとlayoutで行うため、ここでは不要
</script>