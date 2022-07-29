import React , {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useGetProductbyIdQuery, useGetUserdataQuery } from "../services/apiurl";
import { Typography, Row, Col, Button, Card, Avatar, Badge } from "antd";
import Spinner from "./Spiner";
import { getToken } from "../services/LocalStorage";
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from "../features/Auth/AuthSlice";

function Example() {
  const { id } = useParams();
  const { Title } = Typography;
 const { access_token } =  getToken()
 const {data , isSuccess, error , isLoading} = useGetUserdataQuery(access_token)
 const [userData, setuserData] = useState({
   email: '',
   name: ''
 })
 // const {name , email} = useSelector(state => state.userSlice)
 const dispatch = useDispatch()

 useEffect(() => {
   if(data && isSuccess){
     setuserData({
       name: data.name,
       email: data.email

     })
   }
 }, [data , isSuccess ])

  
 useEffect(() => {
   if(data && isSuccess){
     dispatch(setUserInfo({
       email: data.email,
       name: data.name

     }))
   }
 }, [data , isSuccess , dispatch])


  return (
    <div>
      <div className="isErrorIsLoading">
        {error && <p>An error occured</p>}
        <div className="po">{isLoading && <Spinner />}</div>
      </div>
      {isSuccess && (
        <>
        {data.name}
        </>
      )}
    </div>
  );
}

export default Example
