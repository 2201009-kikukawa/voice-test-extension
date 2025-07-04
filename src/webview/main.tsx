import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { popupTexts } from "../constants/popupTexts";

const main = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentText, setCurrentText] = useState<string>("");

  const handleShowPopup = (e: React.MouseEvent) => {
    const vscode = acquireVsCodeApi();
    const randomIndex = Math.floor(Math.random() * popupTexts.length);
    const text = popupTexts[randomIndex];
    vscode.postMessage({
      type: "showModal",
      text,
    });

    // 初回操作で音声を有効化
    if (!audioEnabled) {
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "showText") {
        // Extension側から音声テキストを受信
        setCurrentText(event.data.text);
      }
    });
  }, []);

  return (
    <>
      <h1>Voice Sample</h1>
      {!audioEnabled ? (
        <VSCodeButton onClick={handleShowPopup}>音声を有効化してモーダルを表示</VSCodeButton>
      ) : (
        <>
          <p>✅ 音声は有効です。定期的にずんだもんが喋ります。</p>
          <VSCodeButton onClick={handleShowPopup}>新しい音声を再生</VSCodeButton>
          {currentText && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}>
              <strong>再生中のテキスト:</strong>
              <p>{currentText}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
