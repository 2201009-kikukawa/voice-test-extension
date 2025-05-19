export const fetchVoice = async (text: string): Promise<string> => {
  const url = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(
    text
  )}&speaker=3&key=t1G_99992-x2326`;
  const res = await fetch(url);
  const json = await res.json();
  return json.wavDownloadUrl || json.mp3DownloadUrl;
};
