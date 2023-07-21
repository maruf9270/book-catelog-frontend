import {RouterProvider} from 'react-router-dom'
import './App.css'
import routes from './routes'

function App() {
  return (
    <>
     <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
