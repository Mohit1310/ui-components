"use client";
import { interpolate } from "flubber";
import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

const PlayPause = () => {
  const shape1 =
    "M0 3C0 1.34315 1.34315 0 3 0H50C51.6569 0 53 1.34315 53 3V175C53 176.657 51.6569 178 50 178H3C1.34315 178 0 176.657 0 175V3Z";
  const shape2 =
    "M91 3C91 1.34315 92.3431 0 94 0H139C140.657 0 142 1.34315 142 3V175C142 176.657 140.657 178 139 178H94C92.3431 178 91 176.657 91 175V3Z";
  const shape1_morphed =
    "M65 134.74L4.66215 174.897C2.66833 176.224 0 174.795 0 172.4V5.54642C0 3.16234 2.64665 1.7308 4.64195 3.03565L64.9887 42.5V51.36";
  const shape2_morphed =
    "M64.9887 42.5L137.658 84.3652C139.623 85.497 139.67 88.3153 137.744 89.5124L65 134.74L64.9887 42.5Z";

  // const shape1_morphed =
  //   "M65 132.235L4.66215 172.392C2.66833 173.719 0 172.289 0 169.894V3.00487C0 0.628218 2.63196 -0.80472 4.62815 0.485123L65 39.4946V84.9946";
  // const shape2_morphed =
  //   "M0 0L72.7092 42.4719C74.6586 43.6106 74.6992 46.4132 72.7836 47.6079L0 93V45.6136V0Z";

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer  transition-transform"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <svg width="142" height="178" viewBox="0 0 142 178" fill="white">
          <SVGMorph isPlaying={isPlaying} paths={[shape1, shape1_morphed]} />
          <SVGMorph isPlaying={isPlaying} paths={[shape2, shape2_morphed]} />
        </svg>
      </button>
    </div>
  );
};

export default PlayPause;

const SVGMorph = ({
  paths,
  isPlaying,
}: {
  paths: string[];
  isPlaying: boolean;
}) => {
  const progress = useMotionValue(0);

  // useTransform parms => motion value, input range, output range, options
  // input and output range i.e array must be of same length
  const path = useTransform(progress, [0, 1], paths, {
    // interpolate params => from shape, to shape, options
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  useEffect(() => {
    const targetValue = isPlaying ? 1 : 0;

    // animate creates a sequence for the morphing to work
    animate(progress, targetValue, {
      duration: 0.5,
      ease: "easeInOut",
    });
  }, [isPlaying, progress]);

  return <motion.path d={path} fill="white" />;
};
