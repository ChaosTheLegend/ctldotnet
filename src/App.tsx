import Navbar from "./components/Navbar.tsx";

const App = () => {
  const name = 'Mothefuka'

  return(
    <div>
      <Navbar/>

      <h1>Hello</h1>
      <h2>{name}</h2>
    </div>
  )
}

export default App