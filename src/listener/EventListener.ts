import * as vscode from "vscode";
import { fetchVoice } from "../listener/VoicevoxAPI";
import { AudioPlayer } from "../utilities/audioPlayer";

export function setupWebviewListeners(webview: vscode.Webview) {
  webview.onDidReceiveMessage(async (message) => {
    switch (message.type) {
      case "showModal": {
        const result = await vscode.window.showInformationMessage(message.text, { modal: true });
        webview.postMessage({ type: "result", value: result });

        // Extension側で直接音声再生
        try {
          const audioUrl = await fetchVoice(message.text);
          await AudioPlayer.playFromUrl(audioUrl);

          // パネルWebviewにテキスト表示指示を送信
          webview.postMessage({
            type: "showText",
            text: message.text,
          });
        } catch (error) {
          console.error("Voice playback failed:", error);
        }
        break;
      }
      default:
        console.warn("Unknown message type", message);
    }
  });
}
