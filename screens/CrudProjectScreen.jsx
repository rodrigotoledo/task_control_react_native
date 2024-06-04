import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Config from 'react-native-config';
import {useQueryClient} from '@tanstack/react-query';
import HeaderProjects from '../components/shared/HeaderProjects';
import axios from 'axios';
import ObjecErrors from '../components/shared/ObjectErrors';
import ImagePicker from 'react-native-image-crop-picker';

const CrudProjectScreen = ({route}) => {
  const api = axios.create({
    baseURL: Config.BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  const id = route.params?.id;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [featureImage, setFeatureImage] = useState('');
  const [completedAt, setCompletedAt] = useState(false);
  const [isCompletedDatePickerVisible, setCompletedDatePickerVisibility] =
    useState(false);
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      if (response.data.completed_at) {
        setCompletedAt(new Date(response.data.completed_at));
      }

      if (response.data.feature_image_url) {
        setFeatureImage(
          Config.BASE_URL + '/' + response.data.feature_image_url,
        );
      }

      setTitle(response.data.title);
    } catch (errorOnFetchData) {
      console.warn('Error fetching project details:', errorOnFetchData);
    }
  };

  const showCompletedDatePicker = () => {
    setCompletedDatePickerVisibility(true);
  };

  const hideCompletedDatePicker = () => {
    setCompletedDatePickerVisibility(false);
  };

  const handleCompletedAtChange = date => {
    setCompletedAt(date);
    hideCompletedDatePicker();
  };

  const clearCompletedDatePicker = () => {
    setCompletedAt(null);
    hideCompletedDatePicker();
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (title) {
      formData.append('title', title);
    } else {
      formData.append('title', '');
    }

    if (completedAt) {
      formData.append('completed_at', completedAt);
    } else {
      formData.append('completed_at', '');
    }
    if (featureImage) {
      formData.append('feature_image', {
        uri: featureImage,
        name: 'feature_image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      if (id) {
        await api.patch(`/api/projects/${id}`, formData);
      } else {
        await api.post('/api/projects', formData);
      }
      queryClient.invalidateQueries({queryKey: ['projects']});
      navigation.navigate('ProjectsScreen');
    } catch (error) {
      if (error.response) {
        console.error('Error Server:', error.response.data);
        setErrors(error.response.data);
      } else if (error.request) {
        console.warn('Error without response:', error.request);
      } else {
        console.warn('Error unknown:', error.message);
      }
    }
  };

  const backToList = () => {
    navigation.navigate('ProjectsScreen');
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        setFeatureImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error: ', error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setErrors([]);
      setTitle('');
      setCompletedAt(null);
      setFeatureImage('');
      if (id) {
        fetchProjectDetails();
      }

      return () => {
        setTitle('');
        setCompletedAt(null);
        setFeatureImage('');
      };
    }, [id]),
  );

  return (
    <SafeAreaView>
      <HeaderProjects title={!id ? 'New project' : 'Editing project'} />
      <ScrollView className="flex p-4">
        {errors && <ObjecErrors errors={errors} />}

        <View className="mx-auto w-full mb-2 flex flex-col">
          <TextInput
            placeholder="Title"
            onChangeText={text => setTitle(text)}
            value={title}
            className="block shadow rounded-md border border-gray-200 outline-none px-2 py-2 mb-2 w-full"
          />
          <View className="flex flex-row space-x-2 w-full mb-2">
            <TouchableOpacity
              onPress={openImagePicker}
              className="bg-gray-200 flex flex-row p-2 items-center rounded w-1/2 justify-center">
              <Text className="font-bold text-gray-500">Select Image</Text>
            </TouchableOpacity>

            {featureImage && (
              <Image source={{uri: featureImage}} className="w-40 h-40" />
            )}
          </View>
          <View className="flex flex-row items-center space-x-2">
            <TouchableOpacity
              className="bg-blue-400 flex flex-row p-2 rounded w-40 justify-center"
              onPress={showCompletedDatePicker}>
              <Text className="font-bold text-white">Completed AT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-400 flex flex-row p-2 rounded w-20 justify-center"
              onPress={clearCompletedDatePicker}>
              <Text className="font-bold text-white">Clear</Text>
            </TouchableOpacity>
            {completedAt && (
              <Text className="font-bold">
                {completedAt.toLocaleString('en-US', {hour12: false})}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isCompletedDatePickerVisible}
              mode="datetime"
              value={completedAt}
              onConfirm={handleCompletedAtChange}
              onCancel={hideCompletedDatePicker}
            />
          </View>
        </View>

        <View className="flex flex-row space-x-2 mt-2">
          <TouchableOpacity
            onPress={onSubmit}
            className="rounded-lg py-3 px-5 bg-blue-600 cursor-pointer w-auto">
            <Text className="text-white font-medium">Save Project</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={backToList}
            className="ml-2 rounded-lg py-3 px-5 bg-gray-400 font-medium">
            <Text>Back to projects</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrudProjectScreen;
