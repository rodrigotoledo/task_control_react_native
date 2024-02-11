/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://5a17-2804-1b3-c002-59fc-449d-bc47-f6c8-1039.ngrok-free.app';

import { QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient()

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
