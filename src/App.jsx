
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './Components/Shared/Header'
import Footer from './Components/Shared/Footer'

function App() {
  const location=useLocation();
  

  return (
    <>
      <div>
        <Header></Header>
        <div className="h-44"></div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App
