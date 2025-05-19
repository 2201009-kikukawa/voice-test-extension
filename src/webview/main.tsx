import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { popupTexts } from "../constants/popupTexts";

const main = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "playAudio" && event.data.audioUrl) {
        setAudioUrl(event.data.audioUrl);
      }
    });
  }, []);


  const handleShowPopup = (e: React.MouseEvent) => {
    const vscode = acquireVsCodeApi();
    const randomIndex = Math.floor(Math.random() * popupTexts.length);
    const text = popupTexts[randomIndex];
    setAudioUrl(null);
    vscode.postMessage({
      type: "showModal",
      text,
    });
  };
  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <>
      <h1>Voice Sample</h1>
      <p>
        <VSCodeButton onClick={handleShowPopup}>モーダルを表示します</VSCodeButton>
      </p>
      {audioUrl && <VSCodeButton onClick={handlePlayAudio}>音声を再生</VSCodeButton>}
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
