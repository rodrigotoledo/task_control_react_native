# Curso de Desenvolvimento React Native: Tasks Control

Neste curso, vamos aprender a desenvolver uma aplicação móvel utilizando React Native, com foco no projeto Tasks Control. Este projeto permite gerenciar tarefas e projetos de forma eficiente, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## Tecnologias Utilizadas:

- **ReactNative**
- **Nativewind**
- **ReactQuery**
- **VectorIcons**

### Diferenciais

- Instalações para criar projetos em ReactNative
- Bibliotecas de JávaScript bem utilizadas pela comunidade de desenvolvimentores
- Layout seguindo padrões atuais com framework CSS
- Manipulação de dados por API refletindo em tempo real

## Módulos do Curso

### 1. Instalando e Configurando o Ambiente de Desenvolvimento com React Native

Para se criar projetos com ReactNative é necessário antes de mais nada ter o `node` instalado na maquina e `npm` ou `yarn`.

Com isto teremos o `npx` instalado também.

`npx` é um utilitário de linha de comando incluído no Node.js versão 5.2.0 e posterior. Ele é usado principalmente para executar pacotes Node.js que não estão instalados globalmente no seu sistema.

Com `npx` instalado vamos criar inicialmente todo o ambiente onde o projeto e suas bibliotecas serão rodadas.

```bash
npx react-native init tasks_control_react_native
```

Projeto criado dentro da pasta `tasks_control_react_native`, dentro da mesma rode o comando:

```bash
npm start
```

Precisará de um emulador instalado, no caso estou usando **AndroidStudio** e o emulador dele. Será perguntado em qual dos emuladores gostaria de executar, digito `a` para rodar em **Android**

Para um bom desenvolvimento em projetos em `ReactNative` não é necessário colocar todas as bibliotecas que a comunidade disponibiliza mas usar de boas práticas. Abaixo, os comandos das bibliotecas que serão utilizadas:

```bash
npm install axios
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install --save react-native-vector-icons
npm install @react-navigation/native@6.1.9
npm install react-native-screens react-native-safe-area-context
npm install react-query
```

- https://github.com/axios/axios
- Ira realizar fazer as requisições em nossa API `Rails`

- https://www.nativewind.dev/
- NativeWind usa Tailwind CSS como linguagem de script para criar um sistema de estilo universal para ReactNative

- https://github.com/oblador/react-native-vector-icons
- Icones vetoriais personalizáveis. Ideais para deixar botões, logotipos e barras de navegação ou guias, com esses ícones

- https://reactnavigation.org/docs/getting-started/
- Oferece um conjunto de bibliotecas extras para se navegar entre components e oferecer areas visiveis independente da plataforma do celular

- https://tanstack.com/query/v3/
- Poderoso gerenciamento de estado assíncrono para React e outros frameworks

### 2. Gerenciando Requisições HTTP com Axios

Utilize o Axios para realizar requisições HTTP para a API do projeto Tasks Control, permitindo a comunicação entre o frontend e o backend de forma eficiente.

A configuração da biblioteca `axios` permitira estabelecer onde operações na api `Rails`

Então abra o arquivo `index.js` e coloque o seguinte conteúdo:

```javascript
// abaixo de
// import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://----.ngrok-free.app';
```

### 3. Configurando o Layout

Com framework css Tailwind CSS é possível obter de maneira bem rápida um desenvolvimento moderno e de boa aparência. Existem sim pacotes, bibliotecas que trazem prontos, botões, listas, tabelas etc; mas é importante entender a base de como as coisas funcionam, não quer dizer decorar mas sim enteder o propósito e saber se adaptar. Inice com o comando:

```bash
npx tailwindcss init
```

Deixe no arquivo criado o seguinte conteúdo

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

E também no arquivo `babel.config.js` com o conteúdo

```css
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ["nativewind/babel"],
};
```

**Ícones**

Com ícone é necessário fazer algo diferente com react-native-vector-icons

Será necessário um pouco de cuidado neste momento para funcionar tudo corretamente pois os ícones precisam estar linkados, ligados corretamente. Instalando com:

```bash
npm install --save react-native-vector-icons
```

Seguindo a documentação, para Android, vamos editar o arquivo `android/app/build.gradle` e adicionar ao final:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

Reinicie a aplicação. Aconselho iniciar sem cache com:

```bash
npm start -- --reset-cache
```

### 4. Navegação entre Telas com React Navigation

A aplicação navega utilizando @react-navigation, mas é necessário acrescentar alguns pacotes:

```bash
npm install @react-navigation/bottom-tabs
npm install @react-navigation/elements
npm install @react-navigation/native
```

- `react-native-navigation` pacote básico para navegação entre os compontentes
- O pacote `@react-navigation/bottom-tabs` é uma biblioteca utilizada para criar navegação por abas
- O pacote `@react-navigation/elements` é uma parte da biblioteca React Navigation, que é uma ferramenta popular para adicionar navegação às aplicações
- `@react-navigation/native` é uma biblioteca utilizada para navegação. Ela fornece uma maneira fácil e eficiente de gerenciar a navegação entre diferentes telas do aplicativo

Agora no arquivo `App.jsx` é que as coisas começam a aparecer, e vamos por partes. Primeiro criando apenas os componentes. Criamos a pasta `components` e o arquivo dentro dela `Tasks.jsx`

```javascript
import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';


const Tasks = () => {
  return (
    <>
      <View className="mx-10 mt-2 flex flex-row space-x-2">
        <Text className="text-2xl font-bold mb-4">Task List</Text>
        <View
          className={`rounded-full bg-orange-400 w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">123</Text>
        </View>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          <Text className="text-black text-lg">Lista de tasks</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Tasks;
```

E nosso `App.tsx` com

```javascript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <NavigationContainer>
      <Tasks />
    </NavigationContainer>
  );
};

export default App;
```

É hora de parar a aplicação e reiniciar limpando inclusive o cache, pois temos agora componentes estilizados e pode ser que seja necessário ter o cache limpo.


```bash
npm start -- --reset-cache
```

Perceba que já começamos a colocar o componente `Tasks` dentro de um `Container` de navegação ou seja, onde será possível navegar entre componentes.

Já é possível ver a primeira tela. Algo que pode acontecer devido a `cache` é que os estilos não serem aplicados. Neste caso abra o aplicativo que gerencia seu emulador, se for Android por exemplo seria Android Studio, abra a lista de emuladores e de um `wipe` no emulador. Ou tentar o comando:

```bash
cd android
./gradlew clean
```

Ainda não fizemos consultas utilizando justamente `react-query` porém ele já esta pronto para ser usado. Agora vamos criar o segundo compontene e inclusive a barra de navegação entre ambos.

Componente `Projects.jsx`

```javascript
import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

const Projects = () => {
  return (
    <>
      <View className="mx-10 mt-2 flex flex-row space-x-2">
        <Text className="text-2xl font-bold mb-4">Project List</Text>
        <View
          className={`rounded-full bg-red-400 w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">2</Text>
        </View>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          <Text className="text-black text-lg">Lista de projects</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Projects;
```

E a barra de navegação que ficara na parte inferior. Para isto voltamos no arquivo `App.jsx` e alteramos para:

```javascript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Tasks from './components/Tasks';
import Projects from './components/Projects';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>{<Tabs />}</NavigationContainer>
  );
};

export default App;
```

### 5. Usando React-Query para realizar operações na API

Nunca foi tao facil receber informações e também fazer operações com React usando essa biblioteca.

Com as operações sendo feitas, podemos refazer consultas de tempo em tempo ou ate mesmo em caso de falha. Tambem é possível disparar um evento no caso de uma função executada.

Usaremos o `axios` e `react-query` pra tudo isto. Agora o arquivo `index.js` ficara assim

```javascript
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://----.ngrok-free.app';
import { QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient()

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
```

Veja que queremos ser um Cliente provedor de informações onde passamos via `client` uma instancia para ser utilizada como estrategia das operações.

Então vamos partir para os dados reais aparecendo na tela, mas por onde isso ocorre. Lembre-se que temos os contextos envolvendo os components nos contextos é que as operações sao compartilhadas e também obtidas. Por exemplo em `TaskContext.js`

```javascript
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("tasks", () => { // em data obtemos os dados, isLoading retorna true ou false enquanto a consulta esta ainda sendo realizada, error é quando acontece algum erro e refectch sinaliza realizar a consulta desta query novamente caso chamada
      return axios.get('/api/tasks').then((response) => response.data);
    },
    {
      retry: 5, // tentativa 5 vezes caso erros ocorram
      refetchOnWindowFocus: true, // refaz a consulta em caso de ter saido da tela e voltar para a mesma
      refetchInterval: 5000 // atualização em segundo plano de 5 em 5 seungos
    }
  );

  // este taskMutation tera o papel de executar algo em nossa API Rails, portanto enviando uma atualização
  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/api/tasks/${taskId}`).then((response) => response.data);
    },
    // Um ponto importante é quando a operação acima for finalizada com sucesso, algo pode ser executado, no caso estamos refazendo a busca a API
    onSuccess: (data) => {
      refetch()
    }
  })

  // Estamos declarando a função que recebera a tarefa, task, que será repassada a nosso contexto e portanto podendo ser chamada em qualquer lugar dos componentes
  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }

  // esta é uma função interessante onde caso a consulta realmente tenha ocorrido pois existe o delay, filtramos para obter o número das tarefas completadas
  const completedTaskCount = () => {
    return !isLoading && data.filter((task) => task.completed_at).length;
  };

  // outra função é que caso a consulta ainda esteja sendo realizada, retorna o fundo cinza, então é feito um calculo onde, se menos de 30% estiverem completadas o fundo será vermelho, menos de 60% será laranja e por cima acima disto verde
  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-500'; 
    }

    const count = completedTaskCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  // Então passamos para nosso contexto prover as informações aos componentes todas as funções e dados que obtivemos, tanto na lista de tarefas quanto a barra de navegação precisam de alguns desses dados
  return <TaskContext.Provider value={{tasks: data, completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount, tasksColor: getCompletionColor }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

E também precisamos do contexto de projetos `context/ProjectContext.jsx`

```javascript
import React, {createContext, useContext} from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';


const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const {data, isLoading, error, refetch} = useQuery(
    'projects',
    () => {
      return axios.get('/api/projects').then(response => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
      refetchInterval: 5000
    },
  );

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios
        .patch(`/api/projects/${projectId}`)
        .then(response => response.data);
    },
    onSuccess: data => {
      refetch();
    },
  });

  const completeProject = project => {
    projectMutation.mutate({projectId: project.id});
  };

  const completedProjectCount = () => {
    return !isLoading && data.filter(project => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400';
    }

    const count = completedProjectCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-slate-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: data,
        completeProject: completeProject,
        isLoadingProjects: isLoading,
        completedProjectCount: completedProjectCount,
        projectsColor: getCompletionColor,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
```

Mas ocorrera um erro pois a aplicação ainda não esta envolvida por estes contextos. Então vamos a próxima lição:

### 6. Componentes da Aplicação e Integração com Context API

Primeiro vamos preparar nossos componentes para receber estar dentro dos contextos:

Começando com o component `component/Tasks.jsx` teremos o seguinte código:

```javascript
import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useTaskContext} from './context/TaskContext';


const Tasks = () => {
  const {tasks, completeTask, isLoadingTasks, completedTaskCount, tasksColor} = useTaskContext();

  const count = !isLoadingTasks && completedTaskCount();
  const tasksColorTheme = tasksColor();

  return (
    <>
      <View className="mx-10 mt-2 flex flex-row space-x-2">
        <Text className="text-2xl font-bold mb-4">Task List</Text>
        <View
          className={`rounded-full ${tasksColorTheme} w-8 h-8 font-bold items-center justify-center flex`}>
          <Text className="text-white">{count}</Text>
        </View>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          {!isLoadingTasks &&
            tasks.map(task => (
              <View
                key={task.id}
                className="border-b border-gray-300 mb-4 border">
                <Text className="border-b border-gray-300 px-4 py-2 text-left">
                  {task.title}
                </Text>
                <Text className="border-b border-gray-300 px-4 py-2 text-left">
                  {task.completed_at ? (
                    <Text className="text-green-500">Completed</Text>
                  ) : (
                    <Text className="text-yellow-500">Pending</Text>
                  )}
                </Text>
                <View className="border-b border-gray-300 px-4 py-2">
                  {task.completed_at ? (
                    <Text className="text-green-500">
                      {new Date(task.completed_at).toLocaleString()}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      className="bg-slate-500 px-2 py-1 rounded"
                      onPress={() => completeTask(task)}>
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

export default Tasks;
```

E agora o `component/Projects.jsx` para usar do que o contexto que ele está envolvido:

```javascript
import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useProjectContext} from './context/ProjectContext';

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
                <Text className="border-b border-gray-300 px-4 py-2 text-left">
                  {project.name}
                </Text>
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
```

Com os componentes prontos para operar baseando-se nos contextos precisamos estar dentro deles. Então no arquivo `App.tsx` acrescentaremos e ficara assim:

```javascript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Tasks from './components/Tasks';
import Projects from './components/Projects';

import {TaskProvider} from './components/context/TaskContext';
import {ProjectProvider} from './components/context/ProjectContext';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <ProjectProvider>
        <NavigationContainer>{<Tabs />}</NavigationContainer>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
```