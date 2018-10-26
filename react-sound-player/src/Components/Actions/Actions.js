import React, {Component} from 'react';
import './Actions.css';

class Actions extends Component {
  render() {
    return (
      <div className="actions">
        <div className="actions__image-container">
          <img
            className={this.props.isPlaying ? "actions__big-image-album active" : "actions__big-image-album disabled"}
            src={this.props.currentSong.image} alt="Album cover"/>
          <div className="actions__small-image-album"/>
        </div>
        <div className="actions__selection-container">
          <div className="actions__rewind-button" onClick={this.props.goBack}>
            <i className="actions__rewind-icon material-icons">
              fast_rewind
            </i>
          </div>
          {this.props.isPlaying ?
            <div className="actions__pause-button" onClick={this.props.pause}>
              <i className="actions__pause-icon material-icons">
                pause
              </i>
            </div>
            :
            <div className="actions__play-button" onClick={this.props.play}>
              <i className="actions__play-icon material-icons">
                play_arrow
              </i>
            </div>
          }
          <div className="actions__forward-button" onClick={this.props.goNext}>
            <i className="actions__forward-icon material-icons">
              fast_forward
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default Actions;