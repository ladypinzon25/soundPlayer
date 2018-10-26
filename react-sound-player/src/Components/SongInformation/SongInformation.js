import React, {Component} from 'react';
import './SongInformation.css';

class SongInformation extends Component {
  state = {
    interval: null,
    currentTime: 0,
    duration: 0
  };

  componentDidMount() {
    const interval = setInterval(() => {
      if (this.props.audio) {
        this.setState({
          currentTime: this.props.audio.currentTime
        });
      }
    }, 100);

    this.setState({interval})
  }

  componentDidUpdate(prevProps) {
    if (this.props.audio && this.props.audio !== prevProps.audio) {
      this.props.audio.addEventListener('loadedmetadata', () => {
        this.setState({duration: this.props.audio.duration});
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const {currentSong, audio} = this.props;
    const {currentTime, duration} = this.state;

    return (
      <div className={this.props.firstTime? "firstTime": this.props.isPlaying? "song-information enabled" : "song-information disabled"}>
        <div className="song-information__data-container">
          <div className="song-information__song-name">{currentSong.name}</div>
          <div className="song-information__artist">{currentSong.trackName}</div>
          {audio &&
          <div className="song-information__time-container">
            <div className="song-information__current-time">{formatSeconds(currentTime)}</div>
            <div className="song-information__final-time">{formatSeconds(duration)}</div>
          </div>
          }
          <div className="song-information__time-bar">
            <div className="song-information__progressive-time" style={{width: `${currentTime * 100 / duration}%`}}/>
          </div>
        </div>
      </div>
    );
  }
}

const formatSeconds = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes < 10 ? 0: ''}${minutes}:${seconds < 10 ? 0: ''}${seconds}`;
};

export default SongInformation;