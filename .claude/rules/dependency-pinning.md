# 依存バージョンの完全固定

- `package.json`の依存は`^`/`~`を使わず、すべて完全固定（exactバージョン）で指定する
- `engines.node`、`devEngines.packageManager`も完全固定で指定する
- 新規依存を追加する際は、実際にインストールして解決されたバージョンをそのまま指定する
- `pnpm-workspace.yaml`のcatalogを使う場合も、catalog側の値を完全固定にする
