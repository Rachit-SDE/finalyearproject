import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/usersSlice'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'
import DefaultLayout from './DefaultLayout'
import Dashboard from '../pages/Dashboard'

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.alerts);
    const navigate = useNavigate()
    const validateToken = async () => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post(`http://localhost:4000/api/user/get-user-by-id` , {} , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(HideLoading())
            if(response.data.success){
                console.log(response.data.data)
                dispatch(setUser(response.data.data))
                
                
            }else{
                localStorage.removeItem('token');
                message.error(response.data.message)
                navigate('./login');
            }
        } catch (error) {
            navigate('./login');
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            validateToken()
        }else{
           navigate("/login")
        }
    },[])
  return (
    <div>
      {!loading && <DefaultLayout>{children}</DefaultLayout>}
    </div>
  )
}

export default ProtectedRoute
