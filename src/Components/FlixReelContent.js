"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

//components
// import FlixFooter from "./FlixFooter";

//icons
import muteIcon from "@/Images/Icons/volume-mute.svg";
import unmuteIcon from "@/Images/Icons/volume-unmute.svg";
import MuxPlayer from "@mux/mux-player-react";
import Hls from "hls.js";


const FlixReelContent = ({ playbackId }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteIcon, setShowMuteIcon] = useState(false); // State to control visibility of mute button
  const videoRef = useRef(null);
  const hideTimeoutRef = useRef(null); // Ref to keep track of timeout


  const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;


  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (e.g., Safari)
      video.src = videoSrc;
    }
  }, [playbackId]);

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleVideoTap = () => {

    setShowMuteIcon(true);  // Show the mute/unmute icon when tapped

    clearTimeout(hideTimeoutRef.current);  // Reset the timer to hide the icon after 5 seconds

    hideTimeoutRef.current = setTimeout(() => {
      setShowMuteIcon(false); // Hide the icon after 5 seconds
    }, 700);

    handleMuteToggle();  // Toggle mute/unmute
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the video is in view
        }
      );

      observer.observe(video);

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    return () => clearTimeout(hideTimeoutRef.current); // Cleanup timeout on unmount
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col snap-start snap-always">
      <video ref={videoRef} className="h-full w-full object-cover min-w-[200px] aspect-video" onClick={handleVideoTap}
        playsInline muted={isMuted}
        loop
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* <MuxPlayer
          // streamType="on-demand"
          playbackId="ryqHJt01Y77vqKbCRNFUXwdFNonyH4sXMdhVoAeknu1k"
          metadataVideoTitle="Placeholder (optional)"
          metadataViewerUserId="Placeholder (optional)"
          primaryColor="trasparent"
          secondaryColor="trasparent"
          className="h-full w-full object-cover min-w-[200px] aspect-video"
          autoPlay={true}
          loop={true}
          muted={true}
        /> */}

      {/* footer */}
      {/* <FlixFooter backOption="/" positionValue="absolute" mode="" /> */}

      {/* Conditionally render the Mute/Unmute Button */}
      {showMuteIcon && (
        <button onClick={handleMuteToggle} type="button"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 gap-2.5 p-3 rounded-[2px] sound-button-gradient flex items-center justify-center"
        >
          <Image src={isMuted ? muteIcon : unmuteIcon} width={24} height={24} alt="" quality={100} />
        </button>
      )}
    </section>
  );
};

export default FlixReelContent;
