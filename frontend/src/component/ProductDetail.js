/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  useDummyDetailMutation,
  useGetProductbyIdQuery,
  useProductDetailMutation,
} from "../services/apiurl";
import Spiner from "./Spiner";
import { useSelector } from "react-redux";
import { getToken } from "../services/LocalStorage";
import Axios from "axios";

function ProductDetail() {
  const options = [
    { value: "0.0", label: "Choose an option" },
    { value: "0", label: "Single" },
    { value: "50", label: "Small Double (+£50.00)" },
    { value: "50.0", label: "Double (+£50.00)" },
    { value: "100", label: "King Size (+£100.00)" },
    { value: "140", label: "Super King Size (+£140.00)" },
  ];
  const button = [
    { value: "0.", label: "Choose an option" },
    { value: "2", label: "Buttons" },
    { value: "1", label: "Diamonds" },
  ];
  const mattress = [
    { value: "0.0", label: "Choose an option" },
    { value: "0", label: "10 inch orthopaedic dual memory foam mattress" },
    { value: "90", label: "1000 pocket mattress (+£90.00)" },
    { value: "120", label: "2000 pocket mattress (+£120.00)" },
    { value: "150", label: "3000 pocket mattress (+£150.00)" },
    { value: "190", label: "4000 pocket mattress (+£190.00)" },
    { value: "150.0", label: "Pilow top mattress (+£150.00)" },
    { value: "100", label: "Full memory foam mattress (+£100.00)" },
  ];
  const fabric = [
    { value: "0.0", label: "Choose an option" },
    { value: "0.00", label: "Chenille" },
    { value: "0.000", label: "Plush velvet" },
    { value: "0.0000", label: "Naples Fabric" },
    { value: "0.00000", label: "Crush Velvet" },
    { value: "0.000000", label: "Leather" },
  ];
  const extra = [
    { value: "0", label: "Choose an option" },
    { value: "60", label: "Ottoman box (+£60.00)" },
    { value: "80", label: "Matching Stool (+£80.00)" },
    { value: "0.0", label: "No Thank you" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [selectedfabric, setSelectedfabric] = useState(fabric[0].value);
  const [selectedbutton, setSelectedbutton] = useState(button[0].value);
  const [selectedmattress, setSelectedmattress] = useState(mattress[0].value);
  const [selectedextra, setSelectedextra] = useState(extra[0].value);

  const profile = useSelector((state) => state.user.email);

  const [product, setproduct] = useState(null);
  const { id } = useParams();

  const { data, isSuccess, isLoading, error } =
    useGetProductbyIdQuery(id);

  const [price, setprice] = useState(null);

  const { access_token } = getToken();
const navigate = useNavigate()


  const addNewStudent = async (e) => {
    let formField = new FormData();
    // formField.append("name", name);
    // formField.append("email", email);
    // formField.append("address", address);
    formField.append("price", parseInt(selectedextra) + parseInt(selectedfabric) + parseInt(selectedmattress) + parseInt(data.selling_price) + parseInt(selectedOption) + parseInt(selectedbutton));
    formField.append("product", data.title);
    formField.append("username", profile);
    formField.append("bed_size", selectedOption);
    formField.append("fabric", selectedfabric);
    formField.append("button", selectedbutton);
    formField.append("mattress", selectedmattress);
    formField.append("extra", selectedextra);
    console.log(formField , '.........');
    // const res = await  productDetail(formField)
    // console.log(res, 'res');


    await Axios({
      method: "post",
      url: "http://localhost:8000/api/product_detail/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
    });
  };










  
  const addtocart = async (title, id) => {
    await Axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/carts/`,
      headers:{
        Authorization: `Bearer ${access_token}`,
    },

      data: { title: title, id: id },                                            
    }).then((response) => {
      console.log(response);
      console.log("jjjjjjjjjj");
      navigate('/cart') 
    });
  };


  const WapperFunction = () => {
    addNewStudent();

    setTimeout(() => addtocart(data.title, data.id), 2000);
  };
  return (
    <div>
      <h1>Product Detail </h1>
      <div className="container my-5">
        <div className="isErrorIsLoading">
          {error && <p>An error occured</p>}
          <div className="po">{isLoading && <Spiner />}</div>
        </div>
        {isSuccess && (
          <>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 text-center align-self-center">
                  <img
                    src={data.image}
                    alt=""
                    className="img-fluid img-thumbnail"
                  />
                </div>
                <div className="col-sm-5 ">
                  <div className="pt-3">
                    <div>
                      <h2 className="product_title entry-title -mr-3">
                        {data.title}{" "}
                      </h2>
                    </div>
                    <div class="product-details">
                      <div class="price">
                        <h6>${data.selling_price}</h6>
                      </div>
                    </div>

                    <br />

                    <label>Bed Size</label>
                    <select
                      className="form-control"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      {options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <br />
                    <form>
                      <label>Fabric Type</label>
                      <select
                        className="form-control"
                        value={selectedfabric}
                        onChange={(e) => setSelectedfabric(e.target.value)}
                      >
                        {fabric.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label>Mattress Type *</label>
                      <select
                        className="form-control"
                        value={selectedmattress}
                        onChange={(e) => setSelectedmattress(e.target.value)}
                      >
                        {mattress.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label>Buttons or Diamonds? *</label>
                      <select
                        className="form-control"
                        value={selectedbutton}
                        onChange={(e) => setSelectedbutton(e.target.value)}
                      >
                        {button.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label>Extra *</label>
                      <select
                        className="form-control"
                        value={selectedextra}
                        onChange={(e) => setSelectedextra(e.target.value)}
                      >
                        {extra.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <div className="form-group">
                        <br />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Your Name"
                          name="name"
                          hidden
                          value={data.title}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Your Name"
                          name="name"
                          value={profile}
                        />
                      </div>
                      Product Total
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="price"
                          name="price"
                          value={
                            parseInt(selectedextra) +
                            parseInt(selectedfabric) +
                            parseInt(selectedmattress) +
                            parseInt(data.selling_price) +
                            parseInt(selectedOption) +
                            parseInt(selectedbutton)
                          }
                        />
                      </div>
                      <br />
                    </form>
                    <button onClick={WapperFunction}>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductDetail;
