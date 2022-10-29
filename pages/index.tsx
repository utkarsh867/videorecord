import React from "react";
import Head from "next/head";
import VideoRecorder from "react-video-recorder";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
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
        {/* @ts-ignore */}
        <VideoRecorder
          timeLimit={5000}
          isOnInitially
          mimeType="video/mp4"
          showReplayControls
          onRecordingComplete={async (videoBlob: Blob) => {
            // Do something with the video...
            const response = await fetch("/api/s3token");
            const { url, key }: { url: string; key: string } =
              await response.json();
            console.log(url);
            await fetch(url, {
              method: "PUT",
              body: videoBlob,
            });
            router.push({
              pathname: "/results",
              query: {
                filename: key,
              },
            });
            // saveFile(videoBlob, "download.mp4");
          }}
        />
      </main>
    </>
  );
}
