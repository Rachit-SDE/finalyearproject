import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PublicRoute from './components/publicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Mydetails from './pages/Mydetails'
import Myfamily from './pages/Myfamily'
import MyBookings from './pages/MyBookings'
import MyPayment from './pages/MyPayment'
import Allbuses from './pages/Allbuses'
import BookNow from './pages/bookNow'
import Map from './components/Map'

 
const App = () => {
  const {loading} = useSelector(state => state.alerts)
  return (
    <div className='app-main'>
      {loading && <Loader/>}
      <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route path = "/" element = {<Home/>} />
         <Route path = "/book-now/:id" element = {<ProtectedRoute><BookNow/></ProtectedRoute>} />
         <Route path = "/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
         <Route path = "/dashboard/mydetails" element = {<ProtectedRoute><Dashboard><Mydetails/></Dashboard></ProtectedRoute>} />
         <Route path = "/dashboard/myfamily" element = {<ProtectedRoute><Dashboard><Myfamily/></Dashboard></ProtectedRoute>} />
         <Route path = "/dashboard/mybookings" element = {<ProtectedRoute><Dashboard><MyBookings/></Dashboard></ProtectedRoute>} />
         <Route path = "/dashboard/mypayments" element = {<ProtectedRoute><Dashboard><MyPayment/></Dashboard></ProtectedRoute>} />
         <Route path = "/register" element = {<PublicRoute><Register/></PublicRoute>} />
         <Route path ="/register" element = {<PublicRoute><Register/></PublicRoute>} />
         <Route path ="/login" element = {<PublicRoute><Login/></PublicRoute>} />
         <Route path ="/allbuses" element = {<PublicRoute><Allbuses/></PublicRoute>} />
         <Route path ="/Map" element = {<Map/>} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


// autosuggestion api
// https://geocode.search.hereapi.com/v1/geocode?q={find locaation} sector 62&apikey={Your Api}

