import { connect } from "react-redux";

import { devices } from "../store/actions";
import {
  getCurrentConferenceID,
  getLocalParticipantID,
} from "../store/reducers/application/selectors";
import {
  getEntity,
  getValidEntities,
} from "../store/reducers/entities/selectors";
import Settings from "../components/screens/settings/Settings";

const mapDispatchToProps = {
  setAudioInput: devices.setAudioInput,
  setAudioOutput: devices.setAudioOutput,
  setVideoInput: devices.setVideoInput,
};

const mapStateToProps = (state) => {
  const localParticipant = getEntity(
    state,
    "participants",
    getLocalParticipantID(state)
  );

  const conference = getEntity(
    state,
    "conferences",
    getCurrentConferenceID(state)
  );

  const audioDevicesIDs = localParticipant.audioDevices;
  const videoDeviceIDs = localParticipant.videoDevices;

  const audioDevices = getValidEntities(state, "devices", audioDevicesIDs);
  const videoDevices = getValidEntities(state, "devices", videoDeviceIDs);

  return {
    conference,
    localParticipant,
    audioDevices,
    videoDevices,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
