# assistant-ui-sandbox

assistant-ui の使い方を試すためのモノレポです。

チャット UI からメッセージを送信すると、サーバーは入力内容にかかわらず、固定の Markdown テキストを SSE で少しずつ配信します。

- `apps/server`: Hono + Cloudflare Workers。SSE配信を自前実装
- `apps/website`: React + assistant-ui。SSEを受信してチャット UI に表示
- `packages/utils`: 共通ユーティリティ（現在は未使用）

構成の詳細は [docs/architecture.md](docs/architecture.md) を参照。

## セットアップ

1. `mise` で Node と pnpm を導入する。バージョンは `mise.toml` で固定されている

   ```bash
   mise install
   ```

2. グローバル版 Vite+ CLI（`vp`）をインストールする。`vp` は `mise install` では導入されない

   macOS:

   ```bash
   brew install vite-plus
   ```

   Linux:

   ```bash
   curl -fsSL https://vite.plus | bash
   ```

   Windows（PowerShell）:

   ```powershell
   irm https://vite.plus/ps1 | iex
   ```

   インストール後に新しいシェルを開き、動作を確認する。

   ```bash
   vp help
   ```

   Vite+ 自身にも Node の管理機能があるが、このリポジトリでは `mise.toml` と `package.json` の `engines.node` がどちらも同じバージョンを指しているため競合しない。Vite+ による Node 管理を無効にしたい場合は `vp env off` でシステム優先モードにできる。

3. 依存関係をインストールする

   ```bash
   vp install
   ```

## 開発

- チェック・テスト・ビルドを一括実行する

```bash
vp run ready
```

- テストを実行する

```bash
vp run test
```

- モノレポ全体をビルドする

```bash
vp run -r build
```

- 開発サーバーを起動する（`apps/server`: `:8787`、`apps/website`: `:5173`。`/api` へのリクエストは `apps/website` から `apps/server` へプロキシされる）

```bash
vp run dev
```
