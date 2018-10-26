import React, {Component} from 'react';
import Actions from "../Actions/Actions";
import SongInformation from "../SongInformation/SongInformation";
import payload from "./FakeJsonPayload";
import './SoundPlayer.css';
import axios from "axios";

class SoundPlayer extends Component {
  state = {
    albums: [],
    currentSong: 0,
    audio: null,
    isPlaying: false,
    firstTime: true
  };

  componentDidMount() {
    axios({
      method: "post",
      url: "https://app.fakejson.com/q",
      data: payload
    }).then(({data}) => {
      this.setState({albums: data.albums}, () => this.initAudio());
    });
  };

  initAudio = (callback) => {
    this.setState({audio: new Audio(this.state.albums[this.state.currentSong].trackUrl)}, callback);
  };

  destroyAudio = (callback) => {
    if (this.state.audio) {
      this.state.audio.pause();
    }
    this.setState({audio: null}, callback);
  };

  play = () => {
    if (!this.state.audio) {
      this.initAudio(() => this.state.audio.play());
    } else {
      this.state.audio.play();
    }
    this.setState({isPlaying: true, firstTime: false});
  };

  pause = () => {
    if (this.state.audio) {
      this.state.audio.pause();
    }
    this.setState({isPlaying: false});
  };

  goBack = () => {
    this.setState({isPlaying: true, firstTime: false});
    this.move(-1);
  };

  goNext = () => {
    this.setState({isPlaying: true, firstTime: false});
    this.move(1);
  };

  move = (delta) => {
    if (this.state.albums[this.state.currentSong + delta]) {
      this.destroyAudio(() => {
        this.setState({currentSong: this.state.currentSong + delta}, () => {
          this.initAudio();
          if (this.state.isPlaying) {
            this.play();
          }
        });
      });
    }
  };

  render() {
    const {albums} = this.state;
    return (
      <div className="sound-player">
        {albums.length &&
        <div>
          <Actions currentSong={this.state.albums[this.state.currentSong]} isPlaying={this.state.isPlaying}
                   goBack={this.goBack} play={this.play} pause={this.pause} goNext={this.goNext}/>
          <SongInformation currentSong={this.state.albums[this.state.currentSong]} audio={this.state.audio}
                           isPlaying={this.state.isPlaying} firstTime={this.state.firstTime}/>
        </div>
        }
      </div>
    );
  }
}

export default SoundPlayer;