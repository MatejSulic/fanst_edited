import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
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

export const useUpdateExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

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
    },
  });
};

export const useLockExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

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
    },
  });
};

export const useInviteParticipantMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

  const inviteParticipant = async (email: string) => {
    const { data } = await axios.post(
      `/api/experiments/${experimentId}/invite-participant`,
      { email }
    );
    return data.data;
  };

  return useMutation(experimentInviteParticipantMutationKey(experimentId), {
    mutationFn: inviteParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentDetailQueryKey(experimentId));
    },
  });
};

export const useCopyExperimentMutation = (experimentId: string) => {
  const queryClient = useQueryClient();

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
    },
  });
};

export const useCreateExperimentMutation = () => {
  const queryClient = useQueryClient();

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
    onSuccess: () => queryClient.invalidateQueries(experimentListQueryKey()),
  });
};

export const useExperiments = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");

  const getExperiments = async (): Promise<ExperimentType[]> => {
    const { data } = await axios.get("/api/experiments?" + searchParams);
    return data.data;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    for (let key in router.query) {
      searchParams.append(key, router.query[key] as string);
    }
    setSearchParams(searchParams.toString());
  }, [router.query]);

  return useQuery([...experimentListQueryKey(), searchParams], getExperiments);
};

export const useExperimentsSafe = () => {
  const { data: experiments, isLoading, isError } = useExperiments();

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

  const deleteExperiment = async () => {
    await axios.delete(`/api/experiments/${experimentId}`);
  };

  return useMutation(experimentDeleteMutationKey(experimentId), {
    mutationFn: deleteExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries(experimentListQueryKey());
    },
  });
};
