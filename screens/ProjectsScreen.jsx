import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useProjectContext} from '../components/context/ProjectContext';
import Config from 'react-native-config';
import HeaderProjects from '../components/shared/HeaderProjects';
import {useRefreshOnFocus} from '../hooks/useRefreshOnFocus';
const baseURL = Config.BASE_URL;

const ProjectsScreen = () => {
  const navigation = useNavigation();
  const {projects, completeProject, destroyProject, isLoadingProjects, refetchProjects} =
    useProjectContext();
  const keyId = `CrudProjectScreen-${Date.now()}`;

  useRefreshOnFocus(refetchProjects);

  return (
    <SafeAreaView>
      <HeaderProjects title="List of Projects" />
      <ScrollView className="container my-2">
        <View className="mx-4">
          {!isLoadingProjects &&
            projects?.map(project => (
              <View
                key={project.id}
                className="border-b border-gray-300 mb-4 border">
                <View className="h-auto w-full justify-center items-center flex border-b border-gray-300 py-2">
                  {project.feature_image_url && (
                    <Image
                      source={{uri: baseURL + project.feature_image_url}}
                      resizeMode="cover"
                      className="w-20 h-20"
                    />
                  )}
                  <Text className="px-4 py-2 w-full">{project.title}</Text>
                  <View className="flex flex-row space-x-2 w-full px-2">
                    <TouchableOpacity
                      className="bg-slate-500 px-2 py-1 rounded"
                      onPress={() =>
                        navigation.navigate('CrudProjectScreen', {
                          id: project.id,
                          keyId: keyId,
                        })
                      }>
                      <Text className="font-bold text-white text-center">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-800 px-2 py-1 rounded"
                      onPress={() => destroyProject(project)}>
                      <Text className="font-bold text-white text-center">
                        Destroy
                      </Text>
                    </TouchableOpacity>
                    {!project.completed_at && (
                      <TouchableOpacity
                        className="bg-slate-500 px-2 py-1 rounded"
                        onPress={() => completeProject(project)}>
                        <Text className="font-bold text-white text-center">
                          Mark as Completed
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {project.completed_at && (
                  <View className="border-b border-gray-300 px-4 py-2">
                    <View className="flex flex-row space-x-4">
                      <Text className="text-green-500">
                        {new Date(project.completed_at).toLocaleString()}
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

export default ProjectsScreen;
