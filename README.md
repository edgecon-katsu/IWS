# IWS - Internal Work System

社内業務システム（Internal Work System）は、チケット管理、承認フロー、SLA監視を統合したヘルプデスクシステムです。

## 機能概要

### 主要機能
- **チケット管理**: 問い合わせの起票から完了まで一元管理
- **承認フロー**: 段階的な承認プロセスによる品質管理
- **SLA監視**: 応答時間・復旧時間の目標値管理
- **ダッシュボード**: KPI・統計情報の可視化
- **ユーザー管理**: 権限別のアクセス制御

### ユーザー種別
- **一般ユーザー**: 問い合わせ起票・自分のチケット確認
- **承認者**: 承認業務・自分のチケット管理
- **サポート担当**: 全チケット管理・システム設定

## 技術スタック

- **フロントエンド**: Nuxt 3, Vue 3, TypeScript
- **スタイリング**: Tailwind CSS, DaisyUI
- **アイコン**: Heroicons
- **開発環境**: Vite, Node.js

## Setup

依存関係をインストール:

```bash
# npm
npm install
```

## 開発サーバー

開発サーバーを起動 (http://localhost:3000):

```bash
npm run dev
```

## プロダクション

プロダクション用ビルド:

```bash
npm run build
```

プロダクションビルドのプレビュー:

```bash
npm run preview
```

## デモアカウント

システムには以下のデモアカウントが用意されています:

| 権限 | メールアドレス | パスワード | 説明 |
|------|----------------|------------|------|
| 一般ユーザー | tanaka@zwei.com | password | 問い合わせ起票・確認 |
| 承認者 | yamada@zwei.com | password | 承認業務・チケット管理 |
| サポート担当 | support@zwei.com | password | 全機能利用可能 |

## プロジェクト構成

├── components/          # Vue コンポーネント
├── composables/         # Composition API
├── layouts/            # レイアウトテンプレート
├── middleware/         # ルートミドルウェア
├── pages/              # ページコンポーネント
├── assets/             # スタイルシート・画像
├── nuxt.config.ts      # Nuxt設定
└── tailwind.config.js  # Tailwind設定
```

## 主要ページ

- `/login` - ログイン画面
- `/dashboard` - ダッシュボード（サポート担当のみ）
- `/tickets` - マイチケット一覧
- `/all-tickets` - 全チケット一覧（サポート担当のみ）
- `/approvals` - 承認待ち一覧（承認者・サポート担当）
- `/inquiry/new` - 新規問い合わせ作成
- `/settings` - システム設定（サポート担当のみ）

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
# iws-demo
