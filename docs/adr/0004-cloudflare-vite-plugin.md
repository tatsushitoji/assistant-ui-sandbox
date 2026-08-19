# 0004: @cloudflare/vite-pluginの採用

## 背景

Cloudflare Workersの開発・ビルドには、Wrangler CLI（`wrangler dev` / `wrangler deploy`）を直接使う方法と、`@cloudflare/vite-plugin`でViteに統合する方法がある。

## 決定

`@cloudflare/vite-plugin`を使い、`vp dev` / `vp build`で開発・ビルドする。Wrangler CLIは実デプロイ時のみ使う。

## 理由

- リポジトリ全体が`vp`コマンドに統一されており、`apps/server`だけ別のCLI操作を覚える必要がなくなる
- `vp check` / `vp test`など既存のワークフローがそのまま使える
