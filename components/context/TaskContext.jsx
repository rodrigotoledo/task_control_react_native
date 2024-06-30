import React, {createContext, useContext, useMemo} from 'react';
import {Alert} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

const TaskContext = createContext();

const getTasks = () => {
  return axios.get('/api/tasks').then(response => response.data);
};

export const TaskProvider = ({children}) => {
  const queryClient = useQueryClient();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
  });

  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios
        .patch(`/api/tasks/${taskId}/mark_as_completed`)
        .then(response => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']});
    },
  });

  const destroyMutation = useMutation({
    mutationFn: ({taskId}) => {
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
                  .delete(`/api/tasks/${taskId}`)
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
      queryClient.invalidateQueries({queryKey: ['tasks']});
    },
  });

  const destroyTask = task => {
    destroyMutation.mutate({taskId: task.id});
  };

  const completeTask = task => {
    taskMutation.mutate({taskId: task.id});
  };

  const completedTaskCount = () => {
    return !isLoading && data?.filter(task => task.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-500';
    }

    const count = completedTaskCount();
    const completionPercentage = (count / data?.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  const value = useMemo(
    () => ({
      tasks: data,
      isLoadingTasks: isLoading,
      refetchTasks: refetch,
      completeTask,
      destroyTask,
      completedTaskCount,
      tasksColor: getCompletionColor,
    }),
    [data, isLoading, refetch, taskMutation, destroyMutation],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);
