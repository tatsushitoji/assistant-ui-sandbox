/**
 * SSEチャンク配信の動作確認用に使う、固定サンプルの長文Markdown。
 * ユーザー入力の内容には依存しない。
 */
export const sampleMessage = `# サーバーからのお知らせ

これは Hono + Cloudflare Workers から Server-Sent Events (SSE) で配信されるサンプルメッセージです。

## このデモについて

クライアントからの入力内容は無視し、常に同じ固定の長文を少しずつチャンク分割して配信します。
チャンクの間には短いスリープを挟んでいるため、実際のストリーミング応答のような見え方になります。

## 特徴

- サーバー側の実装は \`hono/streaming\` の \`streamSSE\` を使用
- クライアント側は \`eventsource-parser\` で SSE をパース
- CORS 設定はなく、開発時は Vite の \`server.proxy\` で同一オリジン化

## まとめ

このサンプルを通じて、SSE を使った一方向のストリーミング配信の基本的な仕組みを確認できます。
`;

/**
 * 与えられた文字列を、おおよそ minLength 〜 maxLength 文字ずつのチャンクに分割する。
 * 改行文字もそのままチャンクに含める。
 */
export function chunkMessage(message: string, minLength = 10, maxLength = 20): string[] {
  const chunks: string[] = [];
  let index = 0;

  while (index < message.length) {
    const remaining = message.length - index;
    const size =
      remaining <= maxLength
        ? remaining
        : Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    chunks.push(message.slice(index, index + size));
    index += size;
  }

  return chunks;
}
