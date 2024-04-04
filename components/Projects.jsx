import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {useProjectContext} from './context/ProjectContext';
import Config from "react-native-config";
import axios from 'axios';
axios.defaults.baseURL = Config.BASE_URL;
const baseURL = axios.defaults.baseURL;

const Projects = () => {
  const {
    projects,
    completeProject,
    isLoadingProjects,
    completedProjectCount,
    projectsColor,
  } = useProjectContext();

  const count = !isLoadingProjects && completedProjectCount();
  const projectsColorTheme = projectsColor();

  return (
    <>
      <View className="mx-10 mt-2 flex flex-row space-x-2">
        <Text className="text-2xl font-bold mb-4">Project List</Text>
        <View
          className={`rounded-full ${projectsColorTheme} w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">{count}</Text>
        </View>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          {!isLoadingProjects &&
            projects.map(project => (
              <View
                key={project.id}
                className="border-b border-gray-300 mb-4 border">
                <View className="h-auto w-full justify-center items-center flex">
                    {project.feature_image_url && (
                      <Image
                        className="mt-2"
                        source={{ uri: baseURL + project.feature_image_url }}
                        style={{ width: 100, height: 100 }} // ajuste o tamanho conforme necessário
                        resizeMode="cover" // ajuste o modo de redimensionamento conforme necessário
                      />
                    )}
                  <Text className="border-b border-gray-300 px-4 py-2 w-full">
                    {project.title}
                  </Text>
                </View>
                <Text className="border-b border-gray-300 px-4 py-2 text-left">
                  {project.completed_at ? (
                    <Text className="text-green-500">Completed</Text>
                  ) : (
                    <Text className="text-yellow-500">Pending</Text>
                  )}
                </Text>
                <View className="border-b border-gray-300 px-4 py-2">
                  {project.completed_at ? (
                    <Text className="text-green-500">
                      {new Date(project.completed_at).toLocaleString()}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      className="bg-slate-500 px-2 py-1 rounded"
                      onPress={() => completeProject(project)}>
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

export default Projects;
