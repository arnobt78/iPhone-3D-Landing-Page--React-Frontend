import type { RefObject } from "react";
import type * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Runs a GSAP tween when target enters view (start: top 85%). Use for section headings, text, images. */
export function animateWithGsap(
  target: string | object,
  animationProps: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars
): void {
  gsap.to(target as gsap.TweenTarget, {
    ...animationProps,
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
}

/** Animates 3D group rotation then both view panels in parallel ("<" = same start time). Used when switching small/large model view. */
export function animateWithGsapTimeline(
  timeline: gsap.core.Timeline,
  rotationRef: RefObject<THREE.Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars
): void {
  const group = rotationRef.current;
  if (!group) return;
  // Sync rotation state so the 3D model angle matches after view switch
  timeline.to(group.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
}
