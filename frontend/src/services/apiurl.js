// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiurl = createApi({
  reducerPath: 'apiurl',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({

    registerUser : builder.mutation({
        query:(user)=>{
            return {
                url: 'signup/',
                method: 'POST',
                body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    loginUser : builder.mutation({
        query:(user)=>{
            return {
                url: 'login/',
                method: 'POST',
                body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    getProduct : builder.query({
        query:()=>{
            return {
                url: 'product/',
                method: 'get',
                // body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    getProductbyId : builder.query({
        query:(id)=>{
            return {
                url: `product/${id}/`,
                method: 'get',
                // body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    getProductbycategory : builder.query({
        query:(category)=>{
            return {
                url: `product/?category__product_category=${category}`,
                method: 'get',
                // body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    getProductbysearch : builder.query({
        query:(keyword)=>{
            return {
                url: `product/${keyword}`,
                method: 'get',
                // body:user,
                headers:{
                    'content-type': 'application/json',
                }
            }
        }
    }),
    getUserdata : builder.query({
        query:(access_token)=>{
            return {
                url: 'profile/',
                method: 'GET',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    getUsercartData : builder.query({
        query:(access_token)=>{
            return {
                url: 'cart/',
                method: 'get',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    updateCartproduct : builder.mutation({
        query:({access_token , id })=>{
            return {
                url: 'updatecartproduct/',
                method: 'POST',
                body:id,
                headers:{
                    'authorization': `Bearer ${access_token}`,


                }
            }
        }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation , useLoginUserMutation , useGetProductQuery , useGetProductbyIdQuery ,useGetProductbycategoryQuery , useGetProductbysearchQuery , useGetUserdataQuery , useGetUsercartDataQuery , useUpdateCartproductMutation } = apiurl