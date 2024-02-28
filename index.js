/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Config from "react-native-config";
import axios from 'axios';
axios.defaults.baseURL = Config.BASE_URL;

import { QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient()

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
