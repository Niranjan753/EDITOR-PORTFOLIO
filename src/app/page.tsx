"use client"

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Mail, Instagram } from 'lucide-react'

const videos = [
  { id: 1, title: 'Video 1', src: '/videos/video1.mp4' },
  { id: 2, title: 'Video 2', src: '/videos/video2.mp4' },
  { id: 3, title: 'Video 3', src: '/videos/video3.mp4' },
  { id: 4, title: 'Video 4', src: '/videos/video4.mp4' },
  { id: 5, title: 'Video 5', src: '/videos/video5.mp4' },
  { id: 6, title: 'Video 6', src: '/videos/video6.mp4' },
]

export default function Component() {
  const [currentVideo, setCurrentVideo] = useState<{ id: number; title: string; src: string; } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const togglePlay = (video: { id: number; title: string; src: string; }) => {
    if (currentVideo && currentVideo.id === video.id) {
      if (isPlaying) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      setCurrentVideo(video)
      setIsPlaying(true)
      // Ensure the video starts playing immediately when a new video is selected
      setTimeout(() => {
        videoRef.current?.play()
      }, 0)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRotateY((x / rect.width - 0.5) * 20)
    setRotateX((y / rect.height - 0.5) * -20)
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center animate-pulse">
            Hey, I'm <span className="text-white">Niranjan</span>
          </h1>
          <div 
            className="perspective-1000 mx-auto w-full h-40 mb-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
          >
            <div className="relative">
              <h2 
                className="text-6xl font-bold text-center opacity-0 animate-fade-in-down bg-gradient-to-r from-blue-500 to-gray-300 bg-clip-text text-transparent p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                Professional <br/>Video Editor
              </h2>
              <p className="text-lg text-center mt-4 mb-6 max-w-2xl mx-auto leading-relaxed">
                Looking for a video editor who can bring your vision to life? With years of experience and a passion for storytelling, I'll transform your raw footage into captivating content that engages your audience and elevates your brand. From corporate videos to social media clips, I deliver polished results on time and within budget. Let's collaborate to create something extraordinary!
              </p>
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'url("data:image/png;base64,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")',
                  opacity: 0.05,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
          animation-delay: 0.5s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      <div className="bg-black text-white p-2 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">My Works</h1>
        
        <div className="grid grid-cols-3 gap-2">
          {videos.map((video) => (
            <div key={video.id} className="bg-black rounded-lg overflow-hidden shadow-sm flex flex-col w-full max-w-[180px] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h3 className="text-[10px] font-semibold p-1 truncate">{video.title}</h3>
              <div className="relative flex-grow">
                <div className="aspect-[9/16] w-full">
                  {currentVideo && currentVideo.id === video.id ? (
                    <video
                      ref={videoRef}
                      src={video.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay={isPlaying}
                    />
                  ) : (
                    <video
                      src={video.src}
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="absolute inset-0 flex items-end justify-end p-2">
                    <button
                      onClick={() => togglePlay(video)}
                      className="bg-white rounded-full p-1 text-black hover:bg-gray-200 transition-colors duration-200"
                    >
                      {currentVideo && currentVideo.id === video.id && isPlaying ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black text-white p-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Contact Me</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <Mail size={24} />
            <a href="mailto:niranjanr753@gmail.com" className="text-xl hover:text-blue-400 transition-colors duration-200">niranjanr753@gmail.com</a>
          </div>
          <div className="flex items-center space-x-4">
            <Instagram size={24} />
            <a href="https://www.instagram.com/todef4ult" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400 transition-colors duration-200">@todef4ult</a>
          </div>
        </div>
      </div>
    </>
  )
}