import { ExtensionContext, window } from "vscode";
import { ViewProvider } from "./providers/ViewProvider";
import { AudioPlayer } from "./utilities/audioPlayer";

export async function activate(context: ExtensionContext) {
  // 音声プレーヤーを初期化
  await AudioPlayer.init();

  const provider = new ViewProvider(context.extensionUri);

  const sampleViewDisposable = window.registerWebviewViewProvider(ViewProvider.viewType, provider);

  context.subscriptions.push(sampleViewDisposable);
}

export function deactivate() {
  // 一時ファイルをクリーンアップ
  AudioPlayer.cleanup();
}
