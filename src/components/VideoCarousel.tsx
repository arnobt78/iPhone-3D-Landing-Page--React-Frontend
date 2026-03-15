import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

interface VideoState {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}

/** Video carousel with progress indicators (tutorial: useRef arrays, GSAP ticker, state) */
function VideoCarousel(): React.ReactElement {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<unknown[]>([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    const span = videoSpanRef.current;
    const div = videoDivRef.current;
    const vRef = videoRef.current;

    if (!span[videoId] || !div[videoId]) return;

    let currentProgress = 0;
    const anim = gsap.to(span[videoId], {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;
          const targetDiv = div[videoId];
          if (targetDiv) {
            gsap.to(targetDiv, {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                    ? "10vw"
                    : "4vw",
            });
          }
          const spanEl = span[videoId];
          if (spanEl) {
            gsap.to(spanEl, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        }
      },
      onComplete: () => {
        if (isPlaying && div[videoId]) {
          gsap.to(div[videoId], { width: "12px" });
        }
        const spanElComplete = span[videoId];
        if (spanElComplete) {
          gsap.to(spanElComplete, { backgroundColor: "#afafaf" });
        }
      },
    });

    if (videoId === 0) {
      anim.restart();
    }

    const animUpdate = (): void => {
      const vid = vRef[videoId];
      const slide = hightlightsSlides[videoId];
      if (vid && slide)
        anim.progress(vid.currentTime / slide.videoDuration);
    };

    if (isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }

    return () => {
      gsap.ticker.remove(animUpdate);
    };
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    const vRef = videoRef.current;
    if (loadedData.length <= 3) return;
    const current = vRef[videoId];
    if (!current) return;
    if (!isPlaying) {
      current.pause();
    } else if (startPlay) {
      current.play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  type ProcessType =
    | "video-end"
    | "video-last"
    | "video-reset"
    | "pause"
    | "play";

  const handleProcess = (type: ProcessType, i?: number): void => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: (i ?? 0) + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        break;
    }
  };

  const handleLoadedMetaData = (
    _i: number,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ): void => {
    setLoadedData((pre) => [...pre, e]);
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  className={`${
                    list.id === 2 ? "translate-x-44" : ""
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, j) => (
                  <p key={j} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>

        <button
          type="button"
          className="control-btn"
          aria-label={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
        >
          <img
            src={
              isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg
            }
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              isLastVideo
                ? handleProcess("video-reset")
                : !isPlaying
                  ? handleProcess("play")
                  : handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
