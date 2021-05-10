import { connect } from "react-redux";

import { session } from "../store/actions";
import SessionSettings from "../components/sessionSettings/SessionSettings";

const mapStateToProps = (state) => ({
  authentication: !!state.application.token,
});
const mapDispatchToProps = {
  open: session.open,
  close: session.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionSettings);
