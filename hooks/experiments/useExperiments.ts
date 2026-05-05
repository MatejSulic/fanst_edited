import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  CreateNewExperimentType,
  ExperimentType,
  UpdateExperimentType,
} from "../../types/experiment";
import {
  experimentCopyMutationKey,
  experimentCreateMutationKey,
  experimentDeleteMutationKey,
  experimentDetailQueryKey,
  experimentInviteParticipantMutationKey,
  experimentListQueryKey,
  experimentLockMutationKey,
  experimentUpdateMutationKey,
} from "./queries";
import { participantListQueryKey } from "../participants/queries";

export const useUpdateExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const updateExperiment = async ({
    experimentData,
  }: {
    experimentData: UpdateExperimentType;
  }) => {
    const { data } = await axios.patch(
      `/api/experiments/${experimentId}`,
      experimentData
    );
    return data.data;
  };

  return useMutation(experimentUpdateMutationKey(experimentId), {
    mutationFn: updateExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
      queryClient.invalidateQueries(experimentDetailQueryKey(experimentId));
      enqueueSnackbar("Experiment saved");
    },
  });
};

export const useLockExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const lockExperiment = async () => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/experiment-lock`
    );
    return data.data;
  };

  return useMutation(experimentLockMutationKey(experimentId), {
    mutationFn: lockExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
      queryClient.invalidateQueries(experimentDetailQueryKey(experimentId));
      enqueueSnackbar("Experiment locked");
    },
  });
};

export const useInviteParticipantMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const inviteParticipant = async ({
    experimentId,
    email,
  }: {
    experimentId: string;
    email: string;
  }) => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/invite-participant`,
      { email }
    );
    return data.data;
  };

  return useMutation(experimentInviteParticipantMutationKey(), {
    mutationFn: inviteParticipant,
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        experimentDetailQueryKey(data._id.toString())
      );
      queryClient.invalidateQueries(
        participantListQueryKey({ experimentId: data._id.toString() })
      );
      enqueueSnackbar("Participant has been invited");
    },
  });
};

export const useCopyExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const copyExperiment = async () => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/experiment-copy`
    );
    return data.data;
  };

  return useMutation(experimentCopyMutationKey(experimentId), {
    mutationFn: copyExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
      enqueueSnackbar("Experiment copied");
    },
  });
};

export const useCreateExperimentMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const createExperiment = async ({
    newExperimentData,
  }: {
    newExperimentData: CreateNewExperimentType;
  }) => {
    const { data } = await axios.post(`/api/experiments/`, newExperimentData);
    return data;
  };

  return useMutation(experimentCreateMutationKey(), {
    mutationFn: createExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
      enqueueSnackbar("Experiment created");
    },
  });
};

export const useExperiments = (options?: { all?: boolean }) => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const search = new URLSearchParams();
    if (!options?.all) {
      for (let key in router.query) {
        search.append(key, router.query[key] as string);
      }
      setSearchParams(search.toString());
    } else {
      search.append("category", "all");
      setSearchParams(search.toString());
    }
  }, [router.query, router.isReady, options?.all]);

  const getExperiments = async (): Promise<ExperimentType[]> => {
    const { data } = await axios.get("/api/experiments?" + searchParams);
    return data.data;
  };

  return useQuery([...experimentListQueryKey(), searchParams], getExperiments);
};

export const useAllExperimentsSafe = () => {
  const {
    data: experiments,
    isLoading,
    isError,
  } = useExperiments({ all: true });

  if (isLoading || isError) {
    return null;
  }

  return experiments;
};

export const useExperiment = (experimentId?: string) => {
  const getExperiment = async (
    experimentId: string
  ): Promise<ExperimentType> => {
    const { data } = await axios.get(`/api/experiments/${experimentId}/`);
    return data.data;
  };

  return useQuery(
    experimentDetailQueryKey(experimentId as string),
    async () => await getExperiment(experimentId as string),
    { enabled: experimentId !== undefined }
  );
};

export const useDeleteExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const deleteExperiment = async () => {
    await axios.delete(`/api/experiments/${experimentId}`);
  };

  return useMutation(experimentDeleteMutationKey(experimentId), {
    mutationFn: deleteExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
      enqueueSnackbar("Experiment deleted");
    },
  });
};
