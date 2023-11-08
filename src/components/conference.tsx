"use client";

import { useHMSActions, useHMSStore, selectPeers } from "@100mslive/react-sdk";
import { useVideo, HMSPeer } from "@100mslive/react-sdk";

export const Conference = () => {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="conference-section bg-zinc-800">
      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

const Peer = ({ peer }: { peer: HMSPeer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""} `}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};