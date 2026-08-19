# 0001: useLocalRuntime + 自作ChatModelAdapter

## 背景

assistant-uiとのバックエンド接続方式には、Vercel AI SDKなどの既製フォーマット向けアダプタや、状態管理を完全に自前で持つ`useExternalStoreRuntime`もある。

## 決定

`useLocalRuntime` + 自作`ChatModelAdapter`を使う。

## 理由

- 今回の主眼はSSEによるプッシュ配信を自前実装することであり、既製のAI SDKフォーマットに乗せると自前実装の範囲が狭まる
- メッセージ履歴やUI状態の管理はassistant-ui側に任せられるため、`useExternalStoreRuntime`より実装量が少ない
