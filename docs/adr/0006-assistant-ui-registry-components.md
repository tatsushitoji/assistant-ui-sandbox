# 0006: UIコンポーネントはレジストリ方式で取り込む

## 背景

assistant-uiのスタイル済みUIの入手方法には、shadcn式レジストリ（`npx assistant-ui@latest add thread`、r.assistant-ui.com）からコンポーネントのコードをコピーして所有する方式と、npmパッケージ`@assistant-ui/react-ui`から既成コンポーネントをimportする方式がある。

## 決定

レジストリ方式を採用する。`components.json`にレジストリ（`https://r.assistant-ui.com/{name}.json`）を設定し、`Thread`などのコンポーネントを`src/components/`にコピーして所有する。コアは`@assistant-ui/react`の現行ライン（0.15系）を使い、コンポーネントの前提であるTailwind CSS v4（`@tailwindcss/vite`）を導入する。

## 理由

- レジストリ方式が公式の現行配布方式であり、レジストリから公式の現行コンポーネントを取り込み、必要に応じて更新内容を反映できる
- コピーしたコンポーネントも`@assistant-ui/react`のAPIに依存するため、コア更新時の互換性対応は引き続き必要になる。ただしコードを所有しているため、独立したUIパッケージのpeer dependencyやリリース追随に縛られず、コア更新に合わせて自分たちで修正できる
- `@assistant-ui/react-ui`は現在メンテナンスされていないレガシーコンポーネントで、公式はレジストリ方式を推奨している
