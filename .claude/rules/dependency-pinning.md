# 依存バージョンの完全固定

- 依存バージョンは`pnpm-workspace.yaml`のcatalogで一元管理し、各`package.json`からは`"catalog:"`で参照する
- catalogの値は`^`/`~`を使わず、すべて完全固定（exactバージョン）で指定する
- `engines.node`、`devEngines.packageManager`も完全固定で指定する
- 新規依存を追加する際は、実際にインストールして解決されたバージョンをそのままcatalogに追加する
