import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

export function useRefreshOnFocus(refetch) {
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );
}
