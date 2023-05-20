import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { participantListQueryKey } from "./queries";

export const useParticipantsExperiments = () => {
  const getParticipantsExperiments = async () => {
    const { data } = await axios.get("/api/participants-experiments");
    return data.data;
  };

  return useQuery(participantListQueryKey(), getParticipantsExperiments);
};
