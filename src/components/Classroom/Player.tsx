import React, { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

const Player: React.FC<{ videoUrl: string; heightFull: boolean }> = ({
  videoUrl,
  heightFull,
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  return (
    <section
      className={`${
        heightFull ? "h-full" : "h-1/2"
      } w-full bg-gray62 flex-center`}
    >
      <ReactHlsPlayer
        playerRef={playerRef}
        src={videoUrl}
        autoPlay={false}
        controls={true}
        height="auto"
        width="auto"
        className="h-full"
      />
    </section>
  );
};

export default Player;
