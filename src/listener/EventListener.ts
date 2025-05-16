import * as vscode from "vscode";

export function setupWebviewListeners(webview: vscode.Webview) {
  webview.onDidReceiveMessage(async (message) => {
    switch (message.type) {
      case "showModal": {
        const result = await vscode.window.showInformationMessage(message.text, { modal: true });
        webview.postMessage({ type: "result", value: result });
        break;
      }

      default:
        console.warn("Unknown message type", message);
    }
  });
}
