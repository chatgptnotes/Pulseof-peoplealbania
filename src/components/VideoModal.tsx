import React, { useEffect, useRef, useState } from 'react';
import { X, Maximize, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc, title = "Demo Video" }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Auto-play when modal opens
      const video = videoRef.current;
      video.play().catch(console.error);
    }
  }, [isOpen]);

  const handleVideoClick = async () => {
    if (videoRef.current && showFullscreenPrompt) {
      try {
        await videoRef.current.requestFullscreen();
        setShowFullscreenPrompt(false);
      } catch (error) {
        console.error('Fullscreen failed:', error);
        setShowFullscreenPrompt(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Reset prompt when user exits fullscreen
      if (!document.fullscreenElement) {
        setShowFullscreenPrompt(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(console.error);
      } else {
        document.exitFullscreen().catch(console.error);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-black rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFullscreenToggle}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
              title="Toggle Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain cursor-pointer"
            onClick={handleVideoClick}
            onError={(e) => {
              console.error('Video failed to load:', e);
            }}
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Fullscreen Prompt Overlay */}
          {showFullscreenPrompt && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center max-w-sm mx-4">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Click video for fullscreen
                </h3>
                <p className="text-sm text-gray-600">
                  Click anywhere on the video to enjoy the full experience
                </p>
              </div>
            </div>
          )}</div>
      </div>
    </div>
  );
}