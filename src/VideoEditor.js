import React, { Component } from "react";
import videoConnect from "react-html5video";
import "react-html5video/dist/styles.css";
import videoToShow from "./sampleVideo.mp4";
import "./videoStyle.css";
import { Player, ControlBar } from "video-react";
import VideoLooper from "react-video-looper";
import "react-video-trimmer/dist/style.css";

class VideoEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: videoToShow,
      startTime: 0,
      endTime: 0,
      currentTime: 0,
      zoom: 1,
      videoDuration: 0,
      scrubTime: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.scrub = this.scrub.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
  }

  // this method will take the start and end time typed by the user in form and pass it to the videoLooper component for looping the video
  handleChange(e) {
    e.preventDefault();
    if (e.target.name === "start") {
      this.setState({
        startTime: e.target.value,
      });
    }
    if (e.target.name === "end") {
      this.setState({
        endTime: e.target.value,
      });
    }
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    const player = document.querySelector(".player");
    const progress = player.querySelector(".progress");

    let mousedown = false;
    progress.addEventListener("click", this.scrub);
    progress.addEventListener("mousemove", (e) => mousedown && this.scrub(e));
  }

  // copy player state to this component's state

  handleStateChange(state) {
    this.setState({
      player: state,
      currentTime: state.currentTime,
      videoDuration: state.duration,
      endTime: state.duration,
    });

    const player = document.querySelector(".player");
    const progressBar = player.querySelector(".progress__filled");
    const percent = (state.currentTime / state.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  // this method take the seek time i.e the time when user click on progress bar and sestate(scrubTime) and immediately calls the seek method
  scrub(e) {
    const player = document.querySelector(".player");
    const progress = player.querySelector(".progress");

    const scrubTime =
      (e.offsetX / progress.offsetWidth) * this.state.videoDuration;
    this.setState(
      {
        scrubTime: scrubTime,
      },
      () => this.seek()
    );
  }

  // it skips the video to the seek time i.e time when user click on progress bar
  seek() {
    console.log(this.state.scrubTime, "this.state.scrubTime");
    this.player.seek(this.state.scrubTime);
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  zoomIn() {
    this.setState((prevState) => {
      return { zoom: prevState.zoom + 0.1 };
    }, this.zoomInFunc);
  }

  zoomInFunc() {
    var properties = [
        "transform",
        "WebkitTransform",
        "MozTransform",
        "msTransform",
        "OTransform",
      ],
      prop = properties[0];
    if (document.getElementById("video")) {
      var vid = document.getElementById("video");
      vid.style.left = 0;
      vid.style.top = 0;
      var rotate = 0;
      vid.style[prop] =
        "scale(" + this.state.zoom + ") rotate(" + rotate + "deg)";
    }
  }

  zoomOut() {
    this.setState((prevState) => {
      return { zoom: prevState.zoom - 0.1 };
    }, this.zoomOutFunc);
  }

  zoomOutFunc() {
    var properties = [
        "transform",
        "WebkitTransform",
        "MozTransform",
        "msTransform",
        "OTransform",
      ],
      prop = properties[0];
    if (document.getElementById("video")) {
      var vid = document.getElementById("video");
      vid.style.left = 0;
      vid.style.top = 0;

      var rotate = 0;
      vid.style[prop] =
        "scale(" + this.state.zoom + ") rotate(" + rotate + "deg)";
    }
  }

  render() {
    const timestamps = ["13", "35", "70", "50"];
    const items = [];
    timestamps.map((time) => {
      items.push(
        <div className="dots" style={{ left: `${time}%` }}>
          <div className="work123" title="Toggle Play">
            work
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="player">
          {/* video player */}
          <div id="video">
            <Player
              ref={(player) => {
                this.player = player;
              }}
              autoPlay={false}
              // startTime={10}
              className="player__video viewer"
              controls={false}
              muted={true}
            >
              <ControlBar autoHide={false} />
              <source
                //  src={`${videoToShow}#t=20,25`}  we can pass custom start & end time like this
                src={videoToShow}
              />
            </Player>
          </div>

          {/* video player ends */}

          {/* player controls */}
          <div className="player__controls">
            <div className="progress">
              <div className="progress__filled"></div>
            </div>

            {items}

            {/* <button >►</button> */}
            <button
              className="player__button toggle"
              title="Toggle Play"
              onClick={this.pause}
            >
              Pause video
            </button>

            <button
              className="player__button toggle"
              title="Toggle Play"
              onClick={this.play}
            >
              Play video
            </button>

            <button
              className="player__button"
              onClick={this.changePlaybackRateRate(1)}
            >
              S++
            </button>
            <button
              className="player__button"
              onClick={this.changePlaybackRateRate(-1)}
            >
              S--
            </button>

            <button className="getTime" onClick="getCurrentTime()">
              add comment
            </button>
            <button className="player__button" onClick={this.zoomIn}>
              +
            </button>
            <button className="player__button" onClick={this.zoomOut}>
              -
            </button>
          </div>

          {/* player controls ends */}
        </div>

        {/* video loop component */}
        <div className="loopHeading"> Video Loop Component Below </div>
        <div className="videoLooper">
          <VideoLooper
            source={videoToShow}
            start={this.state.startTime}
            end={this.state.endTime}
            controls={true}
          />

          <div className="loopForm">
            <form>
              <label>Start Time: </label>
              <input type="text" name="start" onChange={this.handleChange} />
              
              <label>End Time:</label>
              <input type="text" name="end" onChange={this.handleChange} />
            </form>
          </div>
        </div>

        {/* video loop component ends */}
      </div>
    );
  }
}

export default videoConnect(VideoEditor);
