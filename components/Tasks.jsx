import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {useTaskContext} from './context/TaskContext';
import Config from "react-native-config";
import axios from 'axios';
axios.defaults.baseURL = Config.BASE_URL;
const baseURL = axios.defaults.baseURL;


const Tasks = () => {
  const {tasks, completeTask, isLoadingTasks, completedTaskCount, tasksColor} = useTaskContext();

  const count = !isLoadingTasks && completedTaskCount();
  const tasksColorTheme = tasksColor();

  return (
    <>
      <View className="mx-10 mt-2 flex flex-row space-x-2">
        <Text className="text-2xl font-bold mb-4">Task List</Text>
        <View
          className={`rounded-full ${tasksColorTheme} w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">{count}</Text>
        </View>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          {!isLoadingTasks &&
            tasks.map(task => (
              <View
                key={task.id}
                className="border-b border-gray-300 mb-4 border">
                <View className="h-auto w-full justify-center items-center flex">
                    {task.feature_image_url && (
                      <Image
                        className="mt-2"
                        source={{ uri: baseURL + task.feature_image_url }}
                        style={{ width: 100, height: 100 }} // ajuste o tamanho conforme necessário
                        resizeMode="cover" // ajuste o modo de redimensionamento conforme necessário
                      />
                    )}
                  <Text className="border-b border-gray-300 px-4 py-2 w-full">
                    {task.title}
                  </Text>
                </View>
                
                <Text className="border-b border-gray-300 px-4 py-2 text-left">
                  {task.completed_at ? (
                    <Text className="text-green-500">Completed</Text>
                  ) : (
                    <Text className="text-yellow-500">Pending</Text>
                  )}
                </Text>
                <View className="border-b border-gray-300 px-4 py-2">
                  {task.completed_at ? (
                    <Text className="text-green-500">
                      {new Date(task.completed_at).toLocaleString()}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      className="bg-slate-500 px-2 py-1 rounded"
                      onPress={() => completeTask(task)}>
                      <Text className="font-bold text-white">
                        Mark as Completed
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Tasks;
