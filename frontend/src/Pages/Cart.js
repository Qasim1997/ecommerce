/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React , {useEffect} from 'react'
import {
    useGetUsercartDataQuery, useUpdateCartproductMutation,
  } from "../services/apiurl";
import { getToken } from '../services/LocalStorage';
import Axios from 'axios'
import Spiner from '../component/Spiner';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '../features/Page Reload/PageSlice';
function Cart() {
    const {access_token} = getToken()
    console.log(useGetUsercartDataQuery(access_token));
    const { data, isSuccess, isLoading, error } = useGetUsercartDataQuery(access_token)
    console.log(useGetUsercartDataQuery(access_token) , '.......................');
    const dispatch = useDispatch()
    const updatecartproduct = async (id) => {
        await Axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/updatecartproduct/`,
          headers: {
            'authorization': `Bearer ${access_token}`,
        },
        data: { id: id },
        }).then((response) => {
            console.log(response);
            console.log("jjjjjjjjjj");
            // dispatch(setPageInfo({
            //   pagereload: response,
            // }))
            window.location.reload(false);
          });
        };
        const editcartproduct = async (id) => {
          await Axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/editcartproduct/`,
            headers: {
              'authorization': `Bearer ${access_token}`,
          },
          data: { id: id },
          }).then((response) => {
              console.log(response);
              console.log("jjjjjjjjjj");
              window.location.reload(false);

            });
          };
        const delatecartproduct = async (id) => {
          await Axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/delatecartproduct/`,
            headers: {
              'authorization': `Bearer ${access_token}`,
          },
          data: { id: id },
          }).then((response) => {
              console.log(response);
              console.log("jjjjjjjjjj");
              window.location.reload(false);

            });
          };
  return (
    <div>
     <div>
      <div class="container my-5">
        <div class="row">
          <h1 class="text-center mb-5">Shopping Cart</h1>
          <div class="col-sm-8">
            <div class="card">
              <div class="card-body">
              <div className="">
        <div className="isErrorIsLoading">
          {error && <p>An error occured</p>}
          <div className="po">{isLoading && <Spiner />}</div>
        </div>
        {isSuccess && (
          <>
          {data[0].cartproduct !== 0 ? (
                  <div>
                    {data[0].cartproduct.map((data, i) => (
                      <div key={i}>
                        <div class="row">
                          <div class="col-sm-3 text-center align-self-center">
                            <img
                              src={`http://127.0.0.1:8000${data.product[0].image}`}
                              alt=""
                              srcset=""
                              class="img-fluid img-thumbnail shadow-sm"
                              height="150"
                              width="150"
                            />
                          </div>
                          <div class="col-sm-9">
                            <div>
                              <h5 className='mx-n'>{data.product[0].title}</h5>
                              <div class="my-3">
                                <label for="quantity">Quantity</label>
                                <a
                                  class="minus-cart btn"
                                  onClick={() => editcartproduct(data.product[0].id)}
                                >
                                  <i class="fas fa-minus-square fa-lg"></i>-
                                </a>
                                {data.quantity}
                                <span id="quantity"></span>
                                <a
                                  class="plus-cart btn"
                                  onClick={() => updatecartproduct(data.product[0].id)}
                               
                                >
                                     {data.product[0].id}
                                  <i class="fas fa-plus-square fa-lg"></i> +{" "}
                                </a>
                              </div>
                              <div class="d-flex justify-content-between">
                                <a
                                  href="#"
                                  class="btn btn-sm btn-secondary mr-3 remove-cart"
                                  onClick={() => delatecartproduct(data.product[0].id)}
                                >
                                  Remove item
                                </a>
                                
                                <p class="mb-0">
                                  <span>
                                    <strong>Rs.{data.price}</strong>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <br></br>
                  </div>
                ) : (
                  <div>Cart is empty</div>
                )} 
           

      
                  
                  
           
          </>
        )}
      </div>


              </div>
            </div>
          </div>

          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h3>The Total Amount of</h3>
                <ul class="list-group">
                  <li
                    class="
                                            list-group-item
                                            d-flex
                                           justify-content-between
                                            align-items-center
                                            border-0
                                            px-0
                                            mb-3
                                        "
                  >
                    <div>
                      <strong>Total</strong> <small>(including VAT)</small>
                    </div>
                    {isSuccess && (
                      <>

<span>
                      <strong id="totalamount">
                        Rs{data[0].total}
                      </strong>
                    </span>
                      
                      
                      </>
                    )}
                  
                  </li>
                </ul>
                <Link to="/checkout" className="btn btn-primary">
                  OrderNow
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart