import { takeLatest } from "redux-saga/effects";

import { conference } from "../../effects";
import watchNearby from "./watchNearby";

export default function* nearbyFlow() {
  yield takeLatest(conference.joined, watchNearby);
}
