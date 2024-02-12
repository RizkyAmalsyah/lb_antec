import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import * as ml5 from "ml5";
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import Webcam from "react-webcam";

const dimensions = {
  width: 800,
  height: 500
}

export default function Dashboard({ auth }) {
  const webcamRef = useRef();
  const canvasRef = useRef();
  const { width, height } = dimensions;

  React.useEffect(() => {
    let detectionInterval;

    // 1. Once the model has loaded, update the dimensions run the model's detection interval
    const modelLoaded = () => {
      const { width, height } = dimensions;
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      detectionInterval = setInterval(() => {
        detect();
      }, 200);
    };

    const objectDetector = ml5.objectDetector('cocossds', modelLoaded);

    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn('Video not ready yet');
        return;
      }

      objectDetector.detect(webcamRef.current.video, (err, results) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        if (results && results.length) {
          results.forEach((detection) => {
            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            const { label, x, y, width, height } = detection;
            ctx.fillText(label, x, y - 5);
            ctx.rect(x, y, width, height);
            ctx.stroke();
          });
        }
      });
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    }
  }, [width, height]
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard">
        <style>
          {`
    .webcam {
      position: absolute;
  }
  
  .canvas {
      position: relative;
  }
  `}
        </style>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
            <Link href={route('conference')}>
              Test
            </Link>
            <div className="">
              <Webcam ref={webcamRef} className='webcam' />
              <canvas ref={canvasRef} className='canvas' />

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
