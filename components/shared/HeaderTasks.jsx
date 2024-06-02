import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../context/TaskContext';

const HeaderTasks = props => {
  const navigation = useNavigation();
  const {isLoadingTasks, completedTaskCount, tasksColor} = useTaskContext();

  const count = !isLoadingTasks && completedTaskCount();
  const tasksColorTheme = tasksColor();

  const handleCreateTask = () => {
    navigation.navigate('CrudTaskScreen');
  };
  return (
    <View className="mx-2 mt-2 flex flex-row space-x-2 ">
      <View className="flex flex-row space-x-2 w-full px-2 items-center h-10">
        <Text className="text-2xl font-bold">{props.title}</Text>
        <View
          className={`rounded-full ${tasksColorTheme} w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">{count}</Text>
        </View>
        <TouchableOpacity
          onPress={handleCreateTask}
          className="text-2xl font-bold  bg-slate-500 px-2 py-1 rounded">
          <Text className="text-white">Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderTasks;
