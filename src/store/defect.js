export const DEFECT_KEY = "@@data/DEFECT_KEY";

export const isValid = (object) =>
  typeof object !== "object" || object[DEFECT_KEY] === undefined;
export const isFaulty = (object) => !isValid(object);
export const isLoading = (object) =>
  !isValid(object) && object[DEFECT_KEY] === "Loading";
export const getDefect = (object) =>
  isValid(object) ? "" : object[DEFECT_KEY];

export const NotFoundEntity = { [DEFECT_KEY]: "Not Found" };
export const InvalidEntity = { [DEFECT_KEY]: "Invalid" };
export const IsLoadingObject = { [DEFECT_KEY]: "Loading" };
export const IsLoadingArray = [];
IsLoadingArray[DEFECT_KEY] = "Loading";
