import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useProjectContext} from '../context/ProjectContext';

const HeaderProjects = props => {
  const navigation = useNavigation();
  const {isLoadingProjects, completedProjectCount, projectsColor} = useProjectContext();

  const count = !isLoadingProjects && completedProjectCount();
  const projectsColorTheme = projectsColor();

  const handleCreateProject = () => {
    navigation.navigate('CrudProjectScreen');
  };
  return (
    <View className="mx-2 mt-2 flex flex-row space-x-2 ">
      <View className="flex flex-row space-x-2 w-full px-2 items-center h-10">
        <Text className="text-2xl font-bold">{props.title}</Text>
        <View
          className={`rounded-full ${projectsColorTheme} w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">{count}</Text>
        </View>
        <TouchableOpacity
          onPress={handleCreateProject}
          className="text-2xl font-bold  bg-slate-500 px-2 py-1 rounded">
          <Text className="text-white">Create Project</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderProjects;
