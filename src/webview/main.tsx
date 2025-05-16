import React from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { popupTexts } from "../constants/popupTexts";
const main = () => {
  const handleShowPopup = (e: React.MouseEvent) => {
    const vscode = acquireVsCodeApi(); // WebviewでVS Code拡張と通信するAPI
    const randomIndex = Math.floor(Math.random() * popupTexts.length);
    vscode.postMessage({
      type: "showModal",
      text: popupTexts[randomIndex],
    });
  };
  return (
    <>
      <h1>Voice Sample</h1>
      <p>
        <VSCodeButton onClick={handleShowPopup}>モーダルを表示します</VSCodeButton>
      </p>
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
