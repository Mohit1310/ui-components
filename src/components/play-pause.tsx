"use client";
import { interpolate } from "flubber";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

const PlayPause = () => {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 129 200" className="size-30" fill="#fff">
        <SVGMorph paths={[shape1, shape1_morphed, shape1]} />
        <SVGMorph paths={[shape2, shape2_morphed, shape2]} />
      </svg>
    </div>
  );
};

export default PlayPause;

const SVGMorph = ({ paths }: { paths: string[] }) => {
  const [indexOfPath, setIndexOfPath] = useState(0);
  const progress = useMotionValue(0);

  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  useEffect(() => {
    animate(progress, indexOfPath, {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.4,
      onComplete: () => {
        if (indexOfPath === paths.length - 1) {
          setIndexOfPath(0);
          progress.set(0);
        } else {
          setIndexOfPath(indexOfPath + 1);
        }
      },
    });
  }, [indexOfPath]);
  return <motion.path d={path} />;
};

const shape1 = "m0,0h53v178H0V0Z";
const shape2 = "m91,0h53v178h-53V0Z";
const shape1_morphed = "m70.45,134.74l-57.68,43.26V0l56.48,42.36,1.19,92.38Z";
const shape2_morphed = "m65.52,39.56l67.58,49.44-67.58,49.44V39.56Z";
