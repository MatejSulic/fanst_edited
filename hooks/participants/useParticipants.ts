import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { participantListQueryKey } from "./queries";

export const useParticipants = () => {
  const getParticipants = async () => {
    const { data } = await axios.get("/api/participants");
    return data.data;
  };

  return useQuery(participantListQueryKey(), getParticipants);
};
