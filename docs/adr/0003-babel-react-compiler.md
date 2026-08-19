# 0003: BabelベースのReact Compiler

## 背景

React Compilerの変換方式として、このプロジェクトではBabelベース（`@vitejs/plugin-react` + `babel-plugin-react-compiler`）とOxcネイティブ（`@vitejs/plugin-react-oxc` + `oxc-transform-react`）を検討した。プロジェクト全体はOxlint/OxfmtなどOxc系ツールチェーンに統一されている。

## 決定

Babelベースの構成を使う。

## 理由

- OxcのReact Compilerサポートは[experimental](https://oxc.rs/docs/guide/usage/transformer/react-compiler)とされている。活発に開発中でオプションや挙動が変更される可能性があり、今すぐ安定して使える状態ではない
- Oxlint/Oxfmtはソースコードの静的解析・整形のみを行い、ビルド時のBabel変換とは別レイヤーのため、Babelを使っても既存ツールチェーンと競合しない
