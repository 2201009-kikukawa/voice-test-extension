import * as https from "https";

// Voicevox Web API のエンドポイント（デフォルト設定）
const VOICEVOX_BASE_URL = "http://localhost:50021";

// テキストから音声ファイル（バッファ）を取得
export async function generateVoiceFromText(text: string): Promise<Buffer> {
  // ①クエリ作成（audio_query）
  const queryRes = await fetch(
    `${VOICEVOX_BASE_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=1`,
    {
      method: "POST",
    }
  );
  const query = await queryRes.json();

  // ②音声合成（synthesis）
  const synthesisRes = await fetch(`${VOICEVOX_BASE_URL}/synthesis?speaker=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });

  // ③音声をBufferで受け取る
  const arrayBuffer = await synthesisRes.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
