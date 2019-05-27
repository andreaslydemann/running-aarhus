import { Action } from "actions/common";
import { DetailsState } from "types/states";
import { DETAILS_TYPES } from "actions/details.actions";

const initialState: DetailsState = {
  error: false,
  loading: false,
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
    userId: ""
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
    case DETAILS_TYPES.SET_RUN:
      return { ...state, run: action.payload };
    default:
      return state;
  }
}
