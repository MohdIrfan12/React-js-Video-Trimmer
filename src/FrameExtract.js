import React from 'react'
import extractFrames from 'ffmpeg-extract-frames'
import videoToShow from './sampleVideo.mp4'

export default function FrameExtract() {

      

    return (
        <div>
            {
                 extractFrames({
                    input: {videoToShow},
                    output: './frame-%d.png'
                  })            
            }
            
        </div>
    )
}
