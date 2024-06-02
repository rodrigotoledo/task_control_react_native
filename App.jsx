if (__DEV__) {
  require('./ReactotronConfig');
}
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TaskProvider} from './components/context/TaskContext';
import {ProjectProvider} from './components/context/ProjectContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const App = () => {
  return (
    <TaskProvider>
      <ProjectProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
