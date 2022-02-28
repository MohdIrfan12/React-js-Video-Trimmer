import React from "react";
import ReactVideoTrimmer from "react-video-trimmer";
import "react-video-trimmer/dist/style.css";
 
const Trimmer = () => {
  const handleVideoEncode = React.useCallback(result => {
    console.log("Encoding Result:", result);
  });
  return (
    <div>
      <ReactVideoTrimmer
    loadingFFMPEGText="Loading required libs..."
    timeLimit={30}
    timeRange={5}
    showEncodeBtn
  />
    </div>
  );
};

export default Trimmer