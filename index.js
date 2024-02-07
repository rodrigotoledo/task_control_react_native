/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://317e-45-71-76-107.ngrok-free.app';

import { QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient()

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
