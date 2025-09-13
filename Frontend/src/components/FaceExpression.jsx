import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Click start to begin detection"
  );
  const [currentMood, setCurrentMood] = useState("");

  useEffect(() => {
    const MODEL_URL = "/models";
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
    loadModels();

    return () => {
      stopDetection();
    };
  }, []);

  const startVideo = () => {
    setStatusMessage("Starting webcam… please allow camera access");
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatusMessage("Webcam ready ✅, click Detect Mood");
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        setStatusMessage("Camera access denied ❌");
        setIsDetecting(false);
      });
  };

  // 🟢 One-time detection
  const detectMood = async () => {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      setStatusMessage("Video not ready yet ❌");
      return;
    }

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 160,
      scoreThreshold: 0.5,
    });

    const detections = await faceapi
      .detectAllFaces(videoRef.current, options)
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const dominantExpression = Object.entries(expressions).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max)
      )[0];

      setCurrentMood(dominantExpression);
      setStatusMessage(`Mood detected: ${dominantExpression} ✅`);

      // fetch songs from backend
      try {
        const res = await axios.get(
          `http://localhost:3000/get-song?mood=${dominantExpression}`
        );
        console.log("Songs:", res.data.songs);
        setSongs(res.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    } else {
      setStatusMessage("No face detected ❌");
    }
  };

  const stopDetection = () => {
    setStatusMessage("Detection stopped ⏹️");

    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsDetecting(false);
    setCurrentMood("");
  };

  const handleToggle = () => {
    if (isDetecting) {
      stopDetection();
    } else {
      setIsDetecting(true);
      startVideo();
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center gap-20 p-10">
      {/* Video / Placeholder */}
      <div className="relative rounded-xl">
        {!isDetecting ? (
          <img
            src="https://cdn.pixabay.com/photo/2017/08/07/14/15/woman-2604283_1280.jpg"
            alt="Placeholder"
            className="rounded-xl w-[600px] h-[400px] object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="rounded-xl shadow-xl max-w-[600px] max-h-[400px]"
            />
            {currentMood && (
              <div className="absolute top-3 left-3 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md text-lg font-bold">
                {currentMood.toUpperCase()}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details */}
      <div className="details">
        <h1 className="text-2xl font-bold">Live Mood Detection</h1>
        <p className="text-xl font-semibold pt-3">
          Your current mood is being analysed <br /> in real-time. Enjoy music
          tailored to your feelings.
        </p>
        <p className="py-2 pb-5">{statusMessage}</p>

        <div className="flex gap-3">
          <button
            className="px-3 py-2 bg-purple-600 rounded font-bold text-white"
            onClick={handleToggle}
          >
            {isDetecting ? "Stop Listening" : "Start Listening"}
          </button>

          {isDetecting && (
            <button
              className="px-3 py-2 bg-green-600 rounded font-bold text-white"
              onClick={detectMood}
            >
              Detect Mood
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
