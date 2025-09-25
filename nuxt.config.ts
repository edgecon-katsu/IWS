export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    css: ['~/assets/css/main.css'],
    ssr: false,

    nitro: {
        experimental: {
            wasm: false
        },
        minify: false,
        devProxy: {
            '/api': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                prependPath: true,
            }
        }
    },

    vite: {
        server: {
            hmr: {
                port: 24678,
                clientPort: 3000
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '/api')
                }
            }
        },
        optimizeDeps: {
            exclude: ['oxc-transform', '@oxc-parser/binding-wasm32-wasi']
        },
        clearScreen: false
    },

    app: {
        head: {
            title: 'IWS - Internal Work System',
        }
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:9000',
            inquiryForm: {
                categories: [
                    {
                        value: 'EUS',
                        label: 'EUS（社内ITサポート）',
                        description: '端末・アカウント・ソフトウェアの問題'
                    },
                    {
                        value: 'Z-CRM',
                        label: '保守 — Z-CRM',
                        description: '顧客管理システムの修正・操作代行'
                    },
                    {
                        value: 'zwei.com',
                        label: '保守 — zwei.com',
                        description: 'Webサイトの障害・コンテンツ更新'
                    },
                    {
                        value: 'network',
                        label: '保守 — ネットワーク',
                        description: '拠点・店舗のネットワーク障害'
                    }
                ],
                targets: [
                    { value: 'terminal', label: '端末・アカウント' },
                    { value: 'app', label: 'アプリ（Z-CRM/他）' },
                    { value: 'site', label: 'サイト（zwei.com）' },
                    { value: 'network', label: '拠点ネットワーク' }
                ],
                categoryForms: {
                    EUS: {
                        purpose: ['障害/不具合', '操作相談', 'アカウント/パスワード', 'ソフト導入', 'プリンタ/VPN/メール'],
                        device: ['PC', 'モバイル', '周辺機器', 'アカウント'],
                        symptoms: ['起動不可', 'サインイン不可', 'メール不可', 'その他'],
                        recentChanges: ['OS更新', 'ドライバ更新', 'なし', '不明']
                    },
                    'Z-CRM': {
                        workType: ['UI操作代行（EUS）', 'システム修正（保守）'],
                        targetType: ['会員', '契約', '申込', 'リード', 'マスタ', 'その他']
                    },
                    'zwei.com': {
                        type: ['障害/不具合', 'コンテンツ更新', '質問'],
                        device: ['PC', 'スマホ', 'タブレット'],
                        browser: ['Chrome', 'Safari', 'Edge', 'Firefox']
                    },
                    network: {
                        location: ['本社', '支社1', '支社2', '店舗01', '店舗51'],
                        equipment: ['XGS2300HA', 'XGS2100HA', 'SD‑RED', 'AP6 420E', 'WAX610', '不明'],
                        symptoms: ['全断', 'Wi‑Fiのみ', '特定サイトのみ', '低速', '断続', '特定端末のみ'],
                        lampStatus: ['正常', '異常', '不明'],
                        carrierContact: ['済', '未']
                    }
                }
            }
        }
    },

    plugins: [
        '~/plugins/auth.client.js'
    ]
})