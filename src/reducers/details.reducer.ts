import { Action } from "actions/common";
import { DetailsState } from "types/states";
import { DETAILS_TYPES } from "actions/details.actions";

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
    run: { ...state.run, participating: !state.run.participating }
  };
}

export default function(
  state: DetailsState = initialState,
  action: Action<any>
) {
  switch (action.type) {
    case DETAILS_TYPES.PARTICIPATION_REQUEST:
      return { ...state, loading: true };
    case DETAILS_TYPES.PARTICIPATION_SUCCESS:
      return toggleParticipation(state);
    case DETAILS_TYPES.PARTICIPATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case DETAILS_TYPES.SET_DETAILS:
      return { ...state, run: action.payload };
    case DETAILS_TYPES.CANCEL_RUN_REQUEST:
      return { ...state, success: false, error: false };
    case DETAILS_TYPES.CANCEL_RUN_SUCCESS:
      return { ...state, success: true };
    case DETAILS_TYPES.CANCEL_RUN_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
}
