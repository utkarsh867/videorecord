import React from "react";
import Head from "next/head";
import VideoRecorder from "react-video-recorder";

export default function Home() {
  function saveFile(blob: Blob, filename: string) {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }

  return (
    <>
      <Head>
        <title>PyCON 2022 Demo</title>
        <meta
          name="description"
          content="Video recording that sends video to a model to do deep-fake detection."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: "100vh" }}>
        <VideoRecorder
          timeLimit={5000}
          mimeType="video/mp4"
          showReplayControls
          onRecordingComplete={(videoBlob: any) => {
            // Do something with the video...
            console.log("videoBlob", videoBlob);
            // saveFile(videoBlob, "download.mp4");
          }}
        />
      </main>
    </>
  );
}
