import React from 'react';
import {View, Text} from 'react-native';
import titleize from 'titleize';

const ObjecErrors = ({errors}) => {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <View className="bg-red-200 text-red-500 px-3 py-2 font-medium rounded-lg my-3">
      <Text className="font-bold">
        {Object.keys(errors).length}{' '}
        {Object.keys(errors).length === 1 ? 'error' : 'errors'} prevented this action from being completed:
      </Text>
      <View>
        {Object.entries(errors).map(([field, messages]) =>
          messages.map((message, i) => (
            <Text key={`${field}-${i}`}>{`${titleize(field)} ${message}`}</Text>
          )),
        )}
      </View>
    </View>
  );
};

export default ObjecErrors;
