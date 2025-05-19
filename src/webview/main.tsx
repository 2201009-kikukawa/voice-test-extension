import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { popupTexts } from "../constants/popupTexts";

let audioContext: AudioContext | null = null;
let unlocked = false;

const main = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleShowPopup = (e: React.MouseEvent) => {
    const vscode = acquireVsCodeApi();
    const randomIndex = Math.floor(Math.random() * popupTexts.length);
    const text = popupTexts[randomIndex];
    vscode.postMessage({
      type: "showModal",
      text,
    });

    if (!unlocked) {
      audioContext = new AudioContext();
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      unlocked = true;
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "playAudio" && event.data.audioUrl && unlocked) {
        const audio = new Audio(event.data.audioUrl);
        audio.play().catch((e) => {
          console.error("Audio playback failed:", e);
        });
      }
    });
  }, []);

  return (
    <>
      <h1>Voice Sample</h1>
      {!audioEnabled ? (
        <VSCodeButton onClick={handleShowPopup}>モーダルを表示</VSCodeButton>
      ) : (
        <p>✅ 音声は有効です。定期的にずんだもんが喋ります。</p>
      )}
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
