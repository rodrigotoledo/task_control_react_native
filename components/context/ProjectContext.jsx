import React, {createContext, useContext, useMemo} from 'react';
import {Alert} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

const ProjectContext = createContext();

const getProjects = () => {
  return axios.get('/api/projects').then(response => response.data);
};

export const ProjectProvider = ({children}) => {
  const queryClient = useQueryClient();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
  });

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios
        .patch(`/api/projects/${projectId}/mark_as_completed`)
        .then(response => response.data);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });

  const destroyMutation = useMutation({
    mutationFn: ({projectId}) => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Are you sure?',
          'This action cannot be undone.',
          [
            {
              text: 'Cancel',
              onPress: () => reject('Canceled'),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                axios
                  .delete(`/api/projects/${projectId}`)
                  .then(response => resolve(response.data))
                  .catch(error => reject(error));
              },
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
      });
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });

  const destroyProject = project => {
    destroyMutation.mutate({projectId: project.id});
  };

  const completeProject = project => {
    projectMutation.mutate({projectId: project.id});
  };

  const completedProjectCount = () => {
    return !isLoading && data?.filter(project => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400';
    }

    const count = completedProjectCount();
    const completionPercentage = (count / data?.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-slate-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };

  const value = useMemo(
    () => ({
      projects: data,
      isLoadingProjects: isLoading,
      refetchProjects: refetch,
      completeProject,
      destroyProject,
      completedProjectCount,
      projectsColor: getCompletionColor,
    }),
    [data, isLoading, refetch, projectMutation, destroyMutation],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
