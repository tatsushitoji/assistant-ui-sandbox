# 0005: Viteの`server.proxy`で同一オリジン化

## 背景

`apps/website`（Vite開発サーバー、`:5173`）と`apps/server`（`:8787`）はローカルでは別ポートになるため、CORS設定またはプロキシで接続する必要がある。

## 決定

`apps/website`のVite設定に`server.proxy`を追加し、`/api`を`apps/server`へ転送する。Hono側にCORSミドルウェアは追加しない。

## 理由

- クライアントは相対パスに`fetch`でリクエストするだけで済み、CORS設定の管理コストがなくなる
- フロントエンドとAPIを同一オリジンで配信する構成にも自然につながる
