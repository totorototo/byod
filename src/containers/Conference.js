import { connect } from "react-redux";

import { conference } from "../store/actions";
import Conference from "../components/conference/Conference";
import {
  getLocalParticipant,
  getRemoteParticipants,
  getParticipantVideo,
  participantHasVideo,
  getConferenceDetails,
} from "../store/selectors/conference";

const mapStateToProps = (state) => ({
  conferenceDetails: getConferenceDetails(state),
  localParticipant: getLocalParticipant(state),
  remoteParticipants: getRemoteParticipants(state),
  videoStarted: state.conference.videoStarted,
  participantVideo: getParticipantVideo(
    state,
    state.conference.localParticipantID
  ),
  hasVideo: participantHasVideo(state, state.conference.localParticipantID),
  hasAudio: participantHasVideo(state, state.conference.localParticipantID),
  screenSharingStream: state.conference.screenSharingStream,
});
const mapDispatchToProps = {
  leave: conference.leave,
  stopAudio: conference.stopAudio,
  startAudio: conference.startAudio,
  stopVideo: conference.stopVideo,
  startVideo: conference.startVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Conference);
