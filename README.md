# Nome do projeto: Tasks Control

## Tecnologias: 

- **ReactNative**
- **Nativewind**
- **ReactQuery**
- **VectorIcons**

## Diferenciais

- Instalações para criar projetos em ReactNative
- Bibliotecas de JávaScript bem utilizadas pela comunidade de desenvolvimentores
- Layout seguindo padrões atuais com framework CSS
- Manipulação de dados por API refletindo em tempo real


## Instalando ReactNative

Para se criar projetos com ReactNative é necessário antes de mais nada ter o `node` instalado na maquina e `npm` ou `yarn`.

Com isto teremos o `npx` instalado também.

`npx` é um utilitário de linha de comando incluído no Node.js versão 5.2.0 e posterior. Ele é usado principalmente para executar pacotes Node.js que não estão instalados globalmente no seu sistema.

## Criando e Inicializando o projeto ReactNative

Com `npx` instalado vamos criar inicialmente todo o ambiente onde o projeto e suas bibliotecas serão rodadas.

```bash
npx react-native init tasks_control_react_native
```

Projeto criado dentro da pasta `tasks_control_react`, dentro da mesma rode o comando:

```bash
npm start
```

Precisará de um emulador instalado, no caso estou usando AndroidStudio e o emulador dele. Será perguntado em qual dos emuladores gostaria de executar, digito `a` para rodar em `Android`

## Configurando bibliotecas para desenvolvimento

Para um bom desenvolvimento em projetos em `ReactNative` não é necessário colocar todas as bibliotecas que a comunidade disponibiliza mas usar de boas práticas. Abaixo, os comandos das bibliotecas que serão utilizadas:

```bash
npm install axios
yarn add nativewind
yarn add --dev tailwindcss@3.3.2
npm install --save react-native-vector-icons
npm install @react-navigation/native@6.1.9
npm install react-native-screens react-native-safe-area-context
npm install react-query
```

### axios

- https://github.com/axios/axios
- Ira realizar fazer as requisições em nossa API `Rails`

### nativewind

- https://www.nativewind.dev/
- NativeWind usa Tailwind CSS como linguagem de script para criar um sistema de estilo universal para ReactNative

### react-native-vector-icons

- https://github.com/oblador/react-native-vector-icons
- Icones vetoriais personalizáveis. Ideais para deixar botões, logotipos e barras de navegação ou guias, com esses ícones

## @react-navigation/*

- https://reactnavigation.org/docs/getting-started/
- Oferece um conjunto de bibliotecas extras para se navegar entre components e oferecer areas visiveis independente da plataforma do celular

### react-query

- https://github.com/oblador/react-native-vector-icons
- Poderoso gerenciamento de estado assíncrono para React e outros frameworks

## Iniciando desenvolvimento

A aplicação em si tera as seguintes funcionalidades:

- Listar tarefas (tasks)
- Listar atualizar tarefa como completada
- Listar projetos (projects)
- Listar atualizar projeto como completado
- Comunicação entre componentes de forma contextual
- Comunicação com api `Rails` de forma sincrona e assincrona

Antes de mais nada é necessário configurar a base de onde as informações serão manipuladas. Entenda que este projeto ira consultar uma api em `Rails` que já desenvolvemos mas poderia ser muito bem consultando um projeto em `node` ou ate mesmo um banco de dados no proprio projeto `React`

### axios

A configuração da biblioteca `axios` permitira estabelecer onde operações na api `Rails`

Então abra o arquivo `index.js` que esta na pasta `src` e coloque o seguinte conteúdo:

```javascript
// abaixo de
// import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://----.ngrok-free.app';
```

### TailwindCSS

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

Reinicie a aplicação. Aconselho iniciar sem cache com:

```bash
npm start -- --reset-cache
```

### react-native-vector-icons

Será necessário um pouco de cuidado neste momento para funcionar tudo corretamente pois os ícones precisam estar linkados, ligados corretamente. Instalando com:

```bash
npm install --save react-native-vector-icons
```

Seguindo a documentação, para Android, vamos editar o arquivo `android/app/build.gradle` e adicionar ao final:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### @react-navigation

Instalando como de costume, instalando com:

```bash
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/elements
yarn add @react-navigation/native
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

## react-query

Poderoso gerenciamento de estado assíncrono javascripts. Utilização para facilmente obter dados de APIs. Instalação...

```bash
npm i react-query
```

Com `react-query` a idéia é quase a mesma de se ter uma aplicação sob um contexto, mas desta vez que possam ser feitas consultas e operações em APIs de forma bem simples alem disto passando as informações para nossos contextos, ou seja, um contexto realizando operações e apos isto passando as mesmas para os outros contextos, de uma forma simples de entender TODO MUNDO SE CONVERSA.

No arquivo `index.js` vamos colocar o a query para funcionar englobando a aplicação:

```javascript
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://....ngrok-free.app';

import { QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient()

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
```

Pronto, agora precisamos criar os contextos que irão realizar operações na `API` mas entenda que poderia ser em um banco local algo parecido.

Criamos a pasta `components/context` e o primeiro contexto será `TaskContext.jsx`

Em poucas palavras, um contexto como já explicado, faz operações e pode prover informações, métodos para os componentes que envolver (inclusive um contexto pode estar dentro de outro contexto). Imagine que você faz uma consulta que reflete em uma lista no celular, mas quer que o número total seja informado no cabeçalho. Mas então você vai pra aba e o cabeçalho permanece com o mesmo número, mas outro usuário cria ou exclui um item desta lista, obviamente como os dois components estao dentro do mesmo contexto, as informações serão compartilhadas e mesmo não estando na mesma tela, o número no cabeçalho irá mudar para os outros usuários.

```javascript
import React, {createContext, useContext} from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const {data, isLoading, error, refetch} = useQuery(
    'tasks',
    () => {
      return axios.get('/tasks').then(response => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
      refetchInterval: 5000
    },
  );

  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/tasks/${taskId}`).then(response => response.data);
    },
    onSuccess: data => {
      refetch();
    },
  });

  const completeTask = task => {
    taskMutation.mutate({taskId: task.id});
  };

  const completedTaskCount = () => {
    return !isLoading && data.filter(task => task.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400';
    }

    const count = completedTaskCount();
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
    <TaskContext.Provider
      value={{
        tasks: data,
        completeTask: completeTask,
        isLoadingTasks: isLoading,
        completedTaskCount: completedTaskCount,
        tasksColor: getCompletionColor,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

Veja que compartilhamos a lista de tarefas `tasks`, o então para marcar a tarefa como completa, o indicado se as informações ainda não estao prontas para serem compartilhadas, a quantidade completada e a cor de fundo.

Algo muito importante, enquanto esta uma operação esta sendo feita, essa variavel `isLoading` fica ouvindo e pronta para dar o resultado que realmente a operação foi feita.


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

### Componentes

Provavelmente a pasta `components` não existe, então crie e dentro dela o primeiro componente `Navbar.jsx`, será a barra de navegação do projeto mas conteúdos serão acrescentados posteriormente.

```javascript
// Navbar.jsx
import React from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

Agora o componente `components/Tasks.jsx` com o seguinte conteúdo

```javascript
// components/Tasks.jsx
import React from 'react';

const Tasks = () => {
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
```

E finalmente o componente `components/Projects.jsx` com o conteúdo

```javascript
// components/Projects.jsx
import React from 'react';

const Projects = () => {

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Project</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
```

Pronto, automaticamente a aplicação que deve estar rodando, mas caso não esteja inicie com o comando `npm start` e nenhum erro será exibido e duas telas sem conteúdos estirão a de tarefas e projetos (tasks, projetcs)


### Entendeo context-api

O que seria o tal de context-api? Existem formas de se trabalhar compartilhando informações entre si, por exemplo REDUX, mas particularmente eu abordo com context-api por ser de maneira mais facil de se entender humanamente dizendo.

Ou seja, quando se tem um contexto de projetos, ali você ira provavelmente coletar informações, fazer operações e expor para o projeto em si, outros componentes poderao pegar as mesmas informações. Em nossa aplicação é possível entender isto da seguinte maneira:

- Obtendo a lista de tarefas (tasks), podemos listar no componente `Tasks.jsx`
- E também exibir a quantidade de tarefas completadas mas isto em outro componente `Navbar.jsx`
- Isto sem precisar ter que fazer duas consultas a `api`, e caso ocorra alguma modificação na lista de tarefas em algum dos componentes, como estamos dentro do contexto de tarefas como um todo, todos os lugares sofrem atualização.

Crie o arquivo `context/TaskContext.js` com o seguinte conteúdo

```javascript
import React, { createContext, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  return <TaskContext.Provider value={{tasks: [3]}}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

E o outro contexto, de projetos no arquivo `context/ProjectContext.js` com o seguinte conteúdo

```javascript
import React, { createContext, useContext } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  return <ProjectContext.Provider value={{projects: [2]}}>{children}</ProjectContext.Provider>
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
```


E no arquivo `src/App.js` vamos atualizar com os dois contextos, tasks e projects de uma vez, o arquivo ficara com o seguinte conteúdo

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import { TaskProvider } from './context/TaskContext';
import { ProjectProvider } from './context/ProjectContext';

const App = () => {
  return (
    <TaskProvider>
      <ProjectProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto mt-28">
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
```

Ou seja, agora os componentes poderao acessar informações compartilhadas pelos contextos, por exemplo a variavel `${tasks}` e `${projects}`.

Na prática, acrescente no arquivo `components/Tasks.jsx` o conteúdo

```javascript
// components/Tasks.jsx
import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Tasks = () => {
  const { tasks } = useTaskContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List - {tasks.length}</h2>
// e o restante do arquivo não mude
```

E também no arquivo `components/Projects.jsx`

```javascript
// components/Projects.jsx
import React from 'react';
import { useProjectContext } from '../context/ProjectContext';

const Projects = () => {
  const { projects } = useProjectContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List {projects.length}</h2>
// e o restante do arquivo não mude
```

E finalmente o componente `components/Navbar.jsx` com a seguinte alteração

```javascript
// Navbar.jsx
import React from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';


const Navbar = () => {
  const { tasks } = useTaskContext();
  const { projects } = useProjectContext();
  
  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks ({tasks.length})
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects ({projects.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

Percebam que busquei as duas informações dos contextos que existem, ou seja, sao informações compartilhadas no projeto como um todo.

Mas agora é que realmente vai ficar bom pois iremos consultar na API em `Rails`

### Usando React-Query para realizar operações na API

Nunca foi tao facil receber informações e também fazer operações com React usando essa biblioteca.

Com as operações sendo feitas, podemos refazer consultas de tempo em tempo ou ate mesmo em caso de falha. Tambem é possível disparar um evento no caso de uma função executada.

Usaremos o `axios` e `react-query` pra tudo isto. Agora o arquivo `src/index.js` ficara assim

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
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
      return axios.get('/tasks').then((response) => response.data);
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
      return axios.patch(`/tasks/${taskId}`).then((response) => response.data);
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

Agora modificando o component `Tasks.jsx` teremos o seguinte código.

Percebe-se que baseado no contexto de Task, obtemos informações.

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

Mas ocorrera um erro pois a aplicação ainda não esta envolvida por este contexto. Então no arquivo `App.tsx` acrescentaremos e ficara assim:

```javascript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Tasks from './components/Tasks';
import Projects from './components/Projects';

import {TaskProvider} from './components/context/TaskContext';

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
      <NavigationContainer>{<Tabs />}</NavigationContainer>
    </TaskProvider>
  );
};

export default App;
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
      return axios.get('/projects').then(response => response.data);
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
        .patch(`/projects/${projectId}`)
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

E claro também envolver a aplicação no com este contexto para buscarmos informações e métodos onde quisermos. Novamente no arquivo `App.jsx`

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

Percebam que agora sao dois contextos e finalmente alterando o `component/Projects.jsx` para usar do que o contexto que ele está envolvido:

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
