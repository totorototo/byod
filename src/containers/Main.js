import { connect } from "react-redux";

import actions from "../store/actions";
import Main from "../components/layout/main/Main";

const getLocalParticipant = (state) => {
  return state.conference.participants.find(
    (participant) => participant.id === state.conference.localParticipantID
  );
};

const mapStateToProps = (state) => ({
  localParticipant: getLocalParticipant(state),
});
const mapDispatchToProps = {
  open: actions.session.open,
  create: actions.conference.create,
  join: actions.conference.join,
  leave: actions.conference.leave,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
