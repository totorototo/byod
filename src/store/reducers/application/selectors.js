export const token = (state) => state.application.authentication.token;

export const getLocalParticipantID = (state) =>
  state.application["@@/data"].localParticipantID;

export const getCurrentConferenceID = (state) =>
  state.application["@@/data"].currentConferenceID;
