import { DetailsState } from "types/states";
import { Action } from "types/common";
import { DETAILS_TYPES } from "actions/details.actions";
import { RunModel } from "../types/models";

const initialState: DetailsState = {
  error: false,
  participationLoading: false,
  cancellationLoading: false,
  success: false,
  run: {
    id: "",
    title: "",
    description: "",
    pace: null,
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

function toggleParticipation(state: DetailsState, updatedRun: RunModel) {
  return {
    error: false,
    participationLoading: false,
    cancellationLoading: false,
    success: true,
    run: {
      ...state.run,
      participating: updatedRun.participating,
      participants: updatedRun.participants
    }
  };
}

export default (runType: string) => (
  state: DetailsState = initialState,
  action: Action<any>
) => {
  switch (action.type) {
    case DETAILS_TYPES.GET_INITIAL_STATE:
      return initialState;
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_REQUEST}`:
      return {
        ...state,
        participationLoading: true,
        error: false,
        success: false
      };
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_SUCCESS}`:
      return toggleParticipation(state, action.payload);
    case `${runType}_${DETAILS_TYPES.PARTICIPATION_FAILURE}`:
      return {
        ...state,
        participationLoading: false,
        error: true,
        success: false
      };
    case `${runType}_${DETAILS_TYPES.SET_DETAILS}`:
      return {
        run: action.payload,
        success: false,
        error: false,
        participationLoading: false,
        cancellationLoading: false
      };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_REQUEST}`:
      return {
        ...state,
        cancellationLoading: true,
        success: false,
        error: false
      };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_SUCCESS}`:
      return {
        ...state,
        run: { ...state.run, cancelled: true },
        cancellationLoading: false,
        success: true,
        error: false
      };
    case `${runType}_${DETAILS_TYPES.CANCEL_RUN_FAILURE}`:
      return {
        ...state,
        cancellationLoading: false,
        success: false,
        error: true
      };
    default:
      return state;
  }
};
