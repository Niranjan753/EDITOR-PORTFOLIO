"use client"

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Mail, Instagram } from 'lucide-react'
import analytics from "/public/videos/analytics.png"

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
      setTimeout(() => {
        videoRef.current?.play()
      }, 0)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRotateY((x / rect.width - 0.5) * 25) // Increased rotation
    setRotateX((y / rect.height - 0.5) * -25)
  }

  return (
    <>
    
      <div className="min-h-screen mt-20 bg-black text-gray-900 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center animate-pulse text-blue-600 drop-shadow-lg">
            Hey, I'm <span className="text-indigo-600">Vishal</span>
          </h1>
          <div 
            className="perspective-1000 mx-auto w-full h-40 mb-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
          >
            <div className="relative">
              <h2 
                className="text-4xl sm:text-6xl font-bold text-center opacity-0 animate-fade-in-down text-blue-600 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:scale-105"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
                }}
              >
                Professional <br/>Video Editor
              </h2>
              <p className="text-base sm:text-lg text-center mt-4 mb-6 max-w-2xl mx-auto leading-relaxed text-gray-700 animate-fade-in">
                Looking for a video editor who can bring your vision to life? With years of experience and a passion for storytelling, I'll transform your raw footage into captivating content that engages your audience and elevates your brand. From corporate videos to social media clips, I deliver polished results on time and within budget. Let's collaborate to create something extraordinary!
              </p>

              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent)',
                  opacity: 0.3,
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
            transform: translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.3s;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          animation-delay: 0.8s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      <div className="bg-black text-gray-900 p-2 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">My Works</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-black">
          {videos.map((video) => (
            <div className="flex flex-col bg-black items-center">
            <div key={video.id} className="bg-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col w-full max-w-[180px] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h3 className="text-[10px] sm:text-xs font-semibold p-1 truncate text-gray-900">{video.title}</h3>
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
                      className="bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700 transition-colors duration-200"
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
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black text-gray-900 p-4 sm:p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-600">Contact Me</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
            <Mail size={24} className="text-blue-600" />
            <a href="mailto:vishalaadhithiya@gmail.com" className="text-lg sm:text-xl text-gray-800 hover:text-blue-600 transition-colors duration-200">vishalaadhithiya24@gmail.com</a>
          </div>
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
            <Instagram size={24} className="text-blue-600" />
            <a href="https://www.instagram.com/vishalaadhithiya/" target="_blank" rel="noopener noreferrer" className="text-lg sm:text-xl text-gray-800 hover:text-blue-600 transition-colors duration-200">@vishalaadhithiya</a>
          </div>
        </div>
      </div>
    </>
  )
}