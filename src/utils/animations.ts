import type { RefObject } from "react";
import type * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** GSAP scroll-triggered animation helper (tutorial: reusable animation util) */
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

/** Timeline-based transition between two model views (tutorial: GSAP timeline) */
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
