import Header from "./components/Header" // Importera Header-komponent
import Footer from "./components/Footer" // Importera Footer-komponent
import './index.css' // Importera index.css-filen
import TodoList from "./components/TodoList" // Importera TodoList-kompponent
import TodoForm from "./components/TodoForm" // Importera TodoForm-komponent

function App() {

  return (
    <>
      <Header />
      <TodoList />
      <TodoForm />
      <Footer />
    </>
  )
}

export default App
