import React from 'react'

function Checkout() {
  return (
    <div>Checkout
            <div className="">
        <div className="isErrorIsLoading">
          <p>An error occured</p>
          <div className="po">{}</div>
        </div>
          <>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 text-center align-self-center">
                  <img
                    src={''}
                    alt=""
                    className="img-fluid img-thumbnail"
                  />
                </div>
                <div className="col-sm-5 ">
                  <div className="pt-3">
                    <div>
                      <h2 className="product_title entry-title -mr-3">
                       {" "}
                      </h2>
                    </div>
                    <div class="product-details">
                      <div class="price">
                        <h6>$</h6>
                      </div>
                    </div>

                    <br />

                    <label>Bed Size</label>
                  
                    <br />
               
                  </div>
                </div>
              </div>
            </div>
          </>
      
      </div>
    </div>
  )
}

export default Checkout