/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import SingleProduct from "../component/SingleProduct";
import {
  useGetProductbycategoryQuery,
  useGetProductbysearchQuery,
  useGetProductQuery,
  useGetUserdataQuery,
} from "../services/apiurl";
import { useLocation  , useNavigate, useParams} from "react-router-dom";
import { getToken } from "../services/LocalStorage";

import { Carousel } from "antd";
import { Typography, Row, Col, Button, Card, Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ListGroup } from "react-bootstrap";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unsetSearchInfo } from "../features/counter/counterSlice";
import { setUserInfo } from "../features/Auth/AuthSlice";
function HomePage() {

const fetchdata = useSelector((state) => state.counter.value)
const x = useSelector((state) => state.counter.search)
  const { data, isSuccess, error, isLoading } = useGetProductQuery();
  const location = useLocation()
  let keyword = location.search
  const navigate = useNavigate()
  console.log(keyword , 'location');
  const responsesearch = useGetProductbysearchQuery(keyword)
  console.log(responsesearch, 'response search');  
  console.log("fetchdata",fetchdata);
  console.log(x , 'xxxxxxxxxxxxxxxxxxxxxxx');
const dispatch = useDispatch()
  const { Meta } = Card;
  const [category, setcategory] = useState("");
  const [bedcategort, setbedcategort] = useState("");
  const [fetching, setfetching] = useState(0);
  const responseInfo = useGetProductbycategoryQuery(category);
  const responseInfobed = useGetProductbycategoryQuery(bedcategort);
const {access_token} = getToken()
  const userData = useGetUserdataQuery(access_token)
console.log(userData, 'profile detail');
  // const {name , email} = useSelector(state => state.userSlice)
 console.log(useGetUserdataQuery(access_token), 'access_token');
  useEffect(() => {
    if(userData.data && userData.isSuccess){
      setUserInfo({
        name: userData.data.name,
        email: userData.data.email
 
      })
    }
  }, [userData.data , userData.isSuccess ])
 
   
  useEffect(() => {
    if(userData.data && userData.isSuccess){
      dispatch(setUserInfo({
        name: userData.data.name,
        email: userData.data.email
 
      }))
    }
  }, [userData.data , userData.isSuccess , dispatch])

  const imageClick2 = async () => {
    navigate('/')
    setcategory("Mattress");
    console.log(category, "category");
    console.log("clickeds");
    // const res = await  productdata(category)
    console.log(responseInfo);
    setfetching(1);
    dispatch(unsetSearchInfo({search:30}))
console.log(x,'x from mattresss'); 
const x = 30   
  };
  const BedProduct = async () => {
    navigate('/')
    setbedcategort("bed");
    console.log(bedcategort, "bedcategort");
    console.log("clickeds");
    // const res = await  productdata(category)
    console.log(responseInfobed);
    setfetching(2);
    dispatch(unsetSearchInfo({search:30}))

  };
console.log(fetching,'fetching number');
  function matt(params) {}

  const { Title } = Typography;

  console.log(useGetProductQuery());

  return (
    <>
    <h1>homepage</h1>
      {/* banner start */}
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="./assets/img/img3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-success">
                      <b>Zay</b> eCommerce
                    </h1>
                    <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                    <p>
                      Zay Shop is an eCommerce HTML5 CSS template with latest
                      version of Bootstrap 5 (beta 1). This template is 100%
                      free provided by{" "}
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://templatemo.com"
                        target="_blank"
                      >
                        TemplateMo
                      </a>{" "}
                      website. Image credits go to{" "}
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://stories.freepik.com/"
                        target="_blank"
                      >
                        Freepik Stories
                      </a>
                      ,
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://unsplash.com/"
                        target="_blank"
                      >
                        Unsplash
                      </a>{" "}
                      and
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://icons8.com/"
                        target="_blank"
                      >
                        Icons 8
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="./assets/img/img3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Proident occaecat</h1>
                    <h3 className="h2">Aliquip ex ea commodo consequat</h3>
                    <p>
                      You are permitted to use this Zay CSS template for your
                      commercial websites. You are{" "}
                      <strong>not permitted</strong> to re-distribute the
                      template ZIP file in any kind of template collection
                      websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="./assets/img/img3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Repr in voluptate</h1>
                    <h3 className="h2">Ullamco laboris nisi ut </h3>
                    <p>
                      We bring you 100% free CSS templates for your websites. If
                      you wish to support TemplateMo, please make a small
                      contribution via PayPal or tell your friends about our
                      website. Thank you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left"></i>
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>
      {/* banner end */}
      <section className="features-area section_gap ml-20 mr-20">
        <div className="container">
          <div className="row features-inner">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-features">
                <div className="f-icon">
                  <img src="img/features/f-icon1.png" alt="" />
                </div>
                <h6>Free Delivery</h6>
                <p>Free Shipping on all order</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-features">
                <div className="f-icon">
                  <img src="img/features/f-icon2.png" alt="" />
                </div>
                <h6>Return Policy</h6>
                <p>Free Shipping on all order</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-features">
                <div className="f-icon">
                  <img src="img/features/f-icon3.png" alt="" />
                </div>
                <h6>24/7 Support</h6>
                <p>Free Shipping on all order</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-features">
                <div className="f-icon">
                  <img src="img/features/f-icon4.png" alt="" />
                </div>
                <h6>Secure Payment</h6>
                <p>Free Shipping on all order</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Title level={5}>h5. Ant Design</Title>

      <Row className="justify-content-between">
        {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 12}} md={{span:12}}> */}
        <Col span={12}>
          <img
            className="img-fluid ml-40"
            height="600"
            src="./assets/img/bed.webp"
            alt=""
            onClick={imageClick2}
          />
          <Title level={2} type="warning" className="text-center">
            Mattressess
          </Title>
          You're only a few clicks away from the perfect night's sleep
        </Col>
        {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 12}} md={{span:12}}> */}
        <Col span={12}>
          <img
            className="img-fluid "
            height="600"
            src="./assets/img/bed.webp"
            alt=""
            onClick={BedProduct}
          />
          <Title level={2} className="text-center -ml-40" type="warning">
            Bed
          </Title>

          <div className="-ml-40">
            {" "}
            You're only a few clicks away from the perfect night's sleep
          </div>
        </Col>
      </Row>
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <div>
        <img
          className="img-fluid ml-40 "
          src="./assets/img/sofas.webp"
          alt=""
        />
        <Title level={2} className="text-center -ml-20" type="warning">
          Sofa Bed
        </Title>
        <div className="-ml-20">
          {" "}
          Give your guest something to walk about with our range of sofa beds
          perfect for spare bedrooms, living areas or office spaces{" "}
        </div>
      </div>
      <br />
      <br />
      <br />
      <Title level={3}>Our Best product</Title>
      <div className="isErrorIsLoading">
        {error && <p>An error occured</p>}
        {isLoading && <p>Loading...</p>}
      </div>

      <Row>
        <Col span={3}></Col>
        <Col span={21}>
          {" "}
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {(() => {
                if (fetching == 0 && x ==30) {
                  return (
                    <>
                      {isSuccess && (
                        <>
                          {data.map((item, i) => (
                            <Grid item xs={4} key={i}>
                              <SingleProduct item={item} />
                            </Grid>
                          ))}
                        </>
                      )}
                    </>
                  );
                } else if (fetching == 1  && x ==30) {
                  return (
                    <>
                      {responseInfo.isSuccess && (
                        <>
                          {responseInfo.data.map((item, i) => (
                            <Grid item xs={4} key={i}>
                              <SingleProduct item={item} />
                            </Grid>
                          ))}
                        </>
                      )}
                    </>
                  );
                } else if (fetching == 2  && x ==30) {
                  return (
                    <>
                      {responseInfobed.isSuccess && (
                        <>
                          {responseInfobed.data.map((item, i) => (
                            <Grid item xs={4} key={i}>
                              <SingleProduct item={item} />
                            </Grid>
                          ))}
                        </>
                      )}
                    </>
                  );
                }  else if (fetchdata >=0  && x >=30) {
                return (
                  <>
                  {responsesearch.isSuccess && (
                    <>
                      {responsesearch.data.map((item, i) => (
                        <Grid item xs={4} key={i}>
                          <SingleProduct item={item} />
                        </Grid>
                      ))}
                    </>
                  )}
                </>
                  );
                }
              })()}
            </Grid>
          </Box>
        </Col>
      </Row>
      <h1>hello</h1>
   
    </>
  );
}

export default HomePage;
