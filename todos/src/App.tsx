import Header from "./components/Header" // Importera Header-komponent
import Footer from "./components/Footer" // Importera Footer-komponent
import './index.css' // Importera index.css-filen
import TodoList from "./components/TodoList" // Importera TodoList-kompponent

function App() {

  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  )
}

export default App
