import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Results() {
  const router = useRouter();
  const { filename } = router.query;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(0.5);

  useEffect(() => {
    fetch("/api/predict", {
      method: "POST",
      body: JSON.stringify({
        filename,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const { result }: { result: number } = await response.json();
      console.log(result);
      setResult(result);
      setLoading(false);
    });
  }, [router.query]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Prediction: {(result * 100).toFixed(2)}% fake</p>
      )}
    </div>
  );
}
