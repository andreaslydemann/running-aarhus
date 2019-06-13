import { DetailsState } from "types/states";
import { Action } from "types/common";
import { DETAILS_TYPES } from "actions/details.actions";
import { GET_INITIAL_STATE } from "constants";

const initialState: DetailsState = {
  error: false,
  loading: false,
  success: false,
  run: {
    id: "",
    title: "",
    description: "",
    pace: 0,
    distance: 0,
    meetingPoint: "",
    coordinates: [],
    startDateTime: "",
    endDateTime: "",
    participants: [],
    participating: false,
    cancelled: false,
    createdBy: {
      id: "",
      firstName: "",
      lastName: "",
      pictureUrl: "",
      creationDate: ""
    }
  }
};

function toggleParticipation(state: DetailsState) {
  return {
    error: false,
    loading: false,
    success: true,
    run: { ...state.run, participating: !state.run.participating }
  };
}

export default (runType: string) => (
  state: DetailsState = initialState,
  action: Action<any>
) => {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return initialState;
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_REQUEST}`:
      return { ...state, loading: true, error: false, success: false };
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_SUCCESS}`:
      return toggleParticipation(state);
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_FAILURE}`:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    case `${runType}_${DETAILS_TYPES.SET_DETAILS}`:
      return {
        run: action.payload,
        success: false,
        error: false,
        loading: false
      };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_REQUEST}`:
      return { ...state, success: false, error: false };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_SUCCESS}`:
      return {
        ...state,
        run: { ...state.run, cancelled: true },
        success: true,
        error: false
      };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_FAILURE}`:
      return { ...state, success: false, error: true };
    default:
      return state;
  }
};
