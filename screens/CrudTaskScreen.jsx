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
import HeaderTasks from '../components/shared/HeaderTasks';
import axios from 'axios';
import ObjecErrors from '../components/shared/ObjectErrors';
import ImagePicker from 'react-native-image-crop-picker';

import FileNameAndMimeType from './shared/FileNameAndMimeType';

const CrudTaskScreen = ({route}) => {
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
  const [scheduledAt, setScheduledAt] = useState(null);
  const [completedAt, setCompletedAt] = useState(null);
  const [isScheduledDatePickerVisible, setScheduledDatePickerVisibility] =
    useState(false);
  const [isCompletedDatePickerVisible, setCompletedDatePickerVisibility] =
    useState(false);
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();

  const fetchTaskDetails = async () => {
    try {
      const response = await api.get(`/api/tasks/${id}`);
      if (response.data.scheduled_at) {
        setScheduledAt(new Date(response.data.scheduled_at));
      }

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
      console.warn('Error fetching task details:', errorOnFetchData);
    }
  };

  const showScheduledDatePicker = () => {
    setScheduledDatePickerVisibility(true);
  };

  const hideScheduledDatePicker = () => {
    setScheduledDatePickerVisibility(false);
  };

  const handleScheduledAtChange = date => {
    setScheduledAt(date);
    hideScheduledDatePicker();
  };

  const clearScheduledDatePicker = () => {
    setScheduledAt(null);
    hideScheduledDatePicker();
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

    if (scheduledAt) {
      formData.append('scheduled_at', scheduledAt.toISOString());
    } else {
      formData.append('scheduled_at', '');
    }

    if (completedAt) {
      formData.append('completed_at', completedAt.toISOString());
    } else {
      formData.append('completed_at', '');
    }

    if (featureImage) {
      const {fileName, mimeType} = FileNameAndMimeType(featureImage);
      formData.append('feature_image', {
        uri: featureImage,
        name: fileName,
        type: mimeType,
      });
    }

    try {
      if (id) {
        await api.patch(`/api/tasks/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        });
      } else {
        await api.post('/api/tasks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        });
      }
      queryClient.invalidateQueries({queryKey: ['tasks']});
      navigation.navigate('TasksScreen');
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else if (error.request) {
        console.warn('Error without response:', error.request);
      } else {
        console.warn('Error unknown:', error.message);
      }
    }
  };

  const backToList = () => {
    navigation.navigate('TasksScreen');
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        console.log(image);
        setFeatureImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error: ', error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setTitle('');
      setCompletedAt(null);
      setScheduledAt(null);
      setFeatureImage('');
      if (id) {
        fetchTaskDetails();
      }

      return () => {
        setTitle('');
        setCompletedAt(null);
        setScheduledAt(null);
      };
    }, [id]),
  );

  return (
    <SafeAreaView>
      <HeaderTasks title={!id ? 'New task' : 'Editing task'} />
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
          <View className="flex flex-row items-center space-x-2 mb-2">
            <TouchableOpacity
              className="bg-blue-400 flex flex-row p-2 rounded w-40 justify-center"
              onPress={showScheduledDatePicker}>
              <Text className="font-bold text-white text-center">
                Scheduled AT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-400 flex flex-row p-2 rounded w-20 justify-center"
              onPress={clearScheduledDatePicker}>
              <Text className="font-bold text-white">Clear</Text>
            </TouchableOpacity>
            {scheduledAt && (
              <Text className="font-bold">
                {scheduledAt.toLocaleString('en-US', {hour12: false})}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isScheduledDatePickerVisible}
              mode="datetime"
              date={scheduledAt || new Date()}
              onConfirm={handleScheduledAtChange}
              onCancel={hideScheduledDatePicker}
            />
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
              date={completedAt || new Date()}
              onConfirm={handleCompletedAtChange}
              onCancel={hideCompletedDatePicker}
            />
          </View>
        </View>

        <View className="flex flex-row space-x-2 mt-2">
          <TouchableOpacity
            onPress={onSubmit}
            className="rounded-lg py-3 px-5 bg-blue-600 cursor-pointer w-auto">
            <Text className="text-white font-medium">Save Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={backToList}
            className="ml-2 rounded-lg py-3 px-5 bg-gray-400 font-medium">
            <Text>Back to tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrudTaskScreen;
