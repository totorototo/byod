import {
  take,
  cancelled,
  call,
  race,
  all,
  put,
  select,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { application, conference } from "../../actions";
import { conference as conferenceEffect } from "../../effects";

function subscribe(resonance, localParticipantID) {
  return eventChannel((emit) => {
    console.log("start watching nearby devices");
    const handleNearbyLost = (nearby) => {
      const json = JSON.parse(nearby.payload);
      const id = json.id;
      console.log("lost: " + id);
      emit({ type: "nearbyLost", id });
    };

    const handleNearbyFound = (nearby) => {
      const json = JSON.parse(nearby.payload);
      const id = json.id;
      console.log("found: " + id);
      emit({ type: "nearbyFound", id });
    };

    const handleSearchStopped = (error) => {
      emit({ type: "searchStopped", error });
    };

    const payload = { id: localParticipantID };
    resonance.startSearch(JSON.stringify(payload));
    resonance.on("nearbyFound", handleNearbyFound);
    resonance.on("nearbyLost", handleNearbyLost);
    resonance.on("searchStopped", handleSearchStopped);

    return () => {
      console.log("stop watching nearby devices");
      resonance.off("nearbyFound", handleNearbyFound);
      resonance.off("nearbyLost", handleNearbyLost);
      resonance.off("searchStopped", handleSearchStopped);
      resonance.stopSearch();
    };
  });
}

function* externalListener(channel) {
  // eslint-disable no-constant-condition
  while (true) {
    const event = yield take(channel);
    switch (event.type) {
      case "nearbyFound":
        yield put(conference.nearbyFound(event.id));
        yield put(conferenceEffect.nearbyFound(event.id));
        break;
      case "nearbyLost":
        /*  yield put(conference.nearbyLost(event.id));
        yield put(conferenceEffect.nearbyLost(event.id));*/
        break;
      default:
        break;
    }
  }
}

/*
function* internalListener(resonance) {
  yield takeEvery(conference.leave, onConferenceLeave(resonance));
}

const onConferenceLeave = (resonance) =>
  function* () {
    yield call([resonance, resonance.stopSearch]);
  };
*/

function createResonanceInstance(id) {
  const key = process.env.REACT_APP_RESONANCE_KEY;
  // eslint-disable-next-line
  return new Resonance(key);
}

export default function* watchNearby() {
  const localParticipantID = yield select(
    (state) => state.conference.localParticipantID
  );

  const resonance = yield call(createResonanceInstance);
  const channel = yield call(subscribe, resonance, localParticipantID);

  let leaving;
  try {
    while (!leaving) {
      const { cancel } = yield race({
        task: all([
          call(externalListener, channel),
          //call(internalListener, resonance),
        ]),
        cancel: take([application.stop, conferenceEffect.left]),
      });

      if (cancel) {
        leaving = true;
        // channel.close();
      }
    }

    channel.close();
  } finally {
    if (yield cancelled()) channel.close();
  }
}
