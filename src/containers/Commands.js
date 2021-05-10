import { connect } from "react-redux";

import { conference } from "../store/actions";
import Commands from "../components/commands/Commands";
import {
  participantHasAudio,
  participantHasVideo,
} from "../store/selectors/conference";

const mapDispatchToProps = {
  leave: conference.leave,
  record: conference.record,
  stopRecording: conference.stopRecording,
  startVideo: conference.startVideo,
  stopVideo: conference.stopVideo,
  startAudio: conference.startAudio,
  stopAudio: conference.stopAudio,
  startScreenShare: conference.startScreenShare,
  stopScreenShare: conference.stopScreenShare,
};

const mapStateToProps = (state) => ({
  localParticipantID: state.conference.localParticipantID,
  hasVideo: participantHasVideo(state, state.conference.localParticipantID),
  hasAudio: participantHasAudio(state, state.conference.localParticipantID),
  recording: state.conference.recording,
  screenSharing: state.conference.screenSharing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Commands);
