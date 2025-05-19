import * as vscode from "vscode";
import { fetchVoice } from "../listener/VoicevoxAPI";

export function setupWebviewListeners(webview: vscode.Webview) {
  webview.onDidReceiveMessage(async (message) => {
    switch (message.type) {
      case "showModal": {
        const result = await vscode.window.showInformationMessage(message.text, { modal: true });
        webview.postMessage({ type: "result", value: result });

        const audioUrl = await fetchVoice(message.text);
        webview.postMessage({
          type: "playAudio",
          audioUrl,
        });
        break;
      }
      default:
        console.warn("Unknown message type", message);
    }
  });
}
