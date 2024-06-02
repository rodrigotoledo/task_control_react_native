import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../components/context/TaskContext';
import {useRefreshOnFocus} from '../hooks/useRefreshOnFocus';
import Config from 'react-native-config';
import HeaderTasks from '../components/shared/HeaderTasks';
const baseURL = Config.BASE_URL;

const TasksScreen = () => {
  const navigation = useNavigation();
  const {tasks, completeTask, destroyTask, isLoadingTasks, refetchTasks} = useTaskContext();
  const keyId = `CrudTaskScreen-${Date.now()}`;

  useRefreshOnFocus(refetchTasks);

  return (
    <SafeAreaView>
      <HeaderTasks title="List of Tasks" />
      <ScrollView className="container my-2">
        <View className="mx-4">
          {!isLoadingTasks &&
            tasks?.map(task => (
              <View
                key={task.id}
                className="border-b border-gray-300 mb-4 border">
                <View className="h-auto w-full justify-center items-center flex border-b border-gray-300 py-2">
                  {task.feature_image_url && (
                    <Image
                      source={{uri: baseURL + task.feature_image_url}}
                      resizeMode="cover"
                      className="w-20 h-20"
                    />
                  )}
                  <Text className="px-4 py-2 w-full">{task.title}</Text>
                  <View className="flex flex-row space-x-2 w-full px-2">
                    <TouchableOpacity
                      className="bg-slate-500 px-2 py-1 rounded"
                      onPress={() =>
                        navigation.navigate('CrudTaskScreen', {
                          id: task.id,
                          keyId: keyId,
                        })
                      }>
                      <Text className="font-bold text-white text-center">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-800 px-2 py-1 rounded"
                      onPress={() => destroyTask(task)}>
                      <Text className="font-bold text-white text-center">
                        Destroy
                      </Text>
                    </TouchableOpacity>
                    {!task.completed_at && (
                      <TouchableOpacity
                        className="bg-slate-500 px-2 py-1 rounded"
                        onPress={() => completeTask(task)}>
                        <Text className="font-bold text-white text-center">
                          Mark as Completed
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View className="border-b border-gray-300 px-4 py-2">
                  {task.scheduled_at ? (
                    <View className="flex flex-row space-x-4">
                      <Text className="text-green-500">
                        {new Date(task.scheduled_at).toLocaleString()}
                      </Text>
                      <Text className="text-green-500">Scheduled AT</Text>
                    </View>
                  ) : (
                    <Text>Waiting for Scheduled</Text>
                  )}
                </View>

                {task.completed_at && (
                  <View className="border-b border-gray-300 px-4 py-2">
                    <View className="flex flex-row space-x-4">
                      <Text className="text-green-500">
                        {new Date(task.completed_at).toLocaleString()}
                      </Text>
                      <Text className="text-green-500">Completed</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;
