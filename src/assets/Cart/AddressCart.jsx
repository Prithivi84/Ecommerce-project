/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import GlobalApi from "../../api/GlobalApi";
import { useNavigate } from "react-router-dom";

export default function AddressCart({ quantity }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const user_id = user.id;
  const [Getaddress, setGetAddress] = useState([]);

  const [mainAddressId, setMainAddressId] = useState();
  const [mainAddress, setMainAddress] = useState();

  // const [item, setItem] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPinCode] = useState(0);

  const [cart, setCart] = useState([]);

  const GetAddress = async (e) => {
    // e.preventDefault();
    let a = { user_id };
    console.log(typeof a);
    try {
      let req = await fetch("http://127.0.0.1:8000/api/adr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
        },
        body: JSON.stringify(a),
      });
      let result = await req.json();
      console.log("result", result);
      setGetAddress(result);
      setMainAddressId(result[0].id);
      setMainAddress(result[0]);
      // localStorage.setItem("user-info", JSON.stringify(result));
    } catch (e) {
      console.log(e);
    }
  };

  const userid = JSON.parse(localStorage.getItem("user-info"));
  const data = {
    userId: userid.id,
  };

  // const GetCart = () => {
  //   GlobalApi.GetCart(data)
  //     .then((res) => {
  //       // setLoading(false);
  //       setCart(res?.carts);
  //       console.log("address", res?.carts, res?.carts[0].quantity);
  //       // setCount(res?.carts.length);
  //     })
  //     .then(() => {
  //       // setLoading(true);
  //     });
  // };

  // const total_cal = () => {
  //   let total = 0;
  //   let totalQuantity = 0;
  //   cart.map((e) => {
  //     total = total + e.products[0].price + e.quantity;
  //     totalQuantity = totalQuantity + e.quantity;
  //   });
  //   // setItem(totalQuantity);
  //   return total;
  // };
  // const total_qu = () => {
  //   let totalQuantity = 0;
  //   cart.map((e) => {
  //     // total = total + e.products[0].price + e.quantity;
  //     totalQuantity = totalQuantity + e.quantity;
  //   });
  //   // setItem(totalQuantity);
  //   return totalQuantity;
  // };

  const formSubmit = async () => {
    if (
      name !== "" &&
      phone !== 0 &&
      country !== "" &&
      address !== "" &&
      city !== "" &&
      state !== "" &&
      pin !== 0
    ) {
      let a = { name, phone, country, address, city, state, pin, user_id };
      console.log(typeof phone);
      console.log(JSON.stringify(a));
      try {
        let req = await fetch("http://127.0.0.1:8000/api/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(a),
        });
        let result = await req.json();
        console.log("result", result);
        GetAddress();
        // setGetAddress(result);
        // localStorage.setItem("user-info", JSON.stringify(result));
      } catch (e) {
        console.log(e);
      }
      setOpen(false);
      setName("");
      setAddress("");
      setEmail("");
      setPhone();
      setCity("");
      setCountry("");
      setPinCode();
    }
  };

  useEffect(() => {
    GetAddress();
    // GetCart();
  }, []);

  return (
    <div className="bg-[#f0fffe] p-4 w-1/4 h-fit">
      {/* address */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-b border-gray-900/10 flex justify-center"
      >
        <div className="min-h-screen p-6  flex items-center justify-center">
          <div className="container  mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                {/* <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3"> */}
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@domain.com"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        />
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          htmlFor="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          htmlFor="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="number"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        value={pin}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex gap-3 items-end">
                        <button
                          onClick={handleClose}
                          className=" font-bold py-2 px-4 rounded"
                        >
                          Close
                        </button>
                        <button
                          onClick={formSubmit}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full flex flex-col  my-2 items-center justify-center">
        <div className="block w-full m-2 bg-white p-1">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"

              // onChange={handleChange}
            >
              {Getaddress.map((i) => (
                <div key={i.id} className="relative mb-2 flex items-center">
                  <Radio
                    checked={mainAddressId === i.id}
                    value={i}
                    onChange={() => {
                      setMainAddressId(i.id);
                      setMainAddress(i);
                    }}
                  />
                  <div>
                    <button className="absolute right-1 top-1 p-1 px-3 bg-slate-100 rounded-sm">
                      Edit
                    </button>
                    <span className="text-xl font-semibold mr-1">{i.name}</span>
                    <span className="text-sm text-gray-500">{i.phone}</span>
                    <br />
                    <span>{i.address},</span>
                    <span>{i.city},</span>
                    <span>{i.state},</span>
                    <span>{i.country},</span>
                    <hr
                      className="my-1"
                      style={{ height: "2px", background: "azure" }}
                    />
                  </div>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <button
          onClick={handleOpen}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-center dark:border-gray-700"
        >
          + Add Address
        </button>
      </div>

      {/* <div className="my-4 bg-slate-200 p-4">
        <h2 className="text-2xl font-semibold">Price Details</h2>
        <hr className="my-4" style={{ height: "2px", background: "azure" }} />
        <div className="text-lg font-medium justify-between flex">
          <span>Price ({total_qu()} items)</span>
          <span>${total_cal()}</span>
        </div>
        <div className="text-lg font-medium justify-between flex">
          <span>Delivery Charges</span>
          <span>
            <strike className="text-gray-700">40</strike>{" "}
            <span className="text-green-600">Free</span>{" "}
          </span>
        </div>
        <hr className="my-4" style={{ height: "2px", background: "azure" }} />
        <div className="text-xl font-medium justify-between flex">
          <span>Total Payable</span>
          <span>${total_cal()}</span>
        </div>
        <hr className="my-4" style={{ height: "2px", background: "azure" }} />
      </div> */}

      <div className="w-full flex items-center justify-center">
        <button
          disabled={Getaddress.length == 0}
          onClick={() =>
            navigate("/Ecommerce-project/Cart/Checkout", {
              state: mainAddress,
            })
          }
          className="flex items-center hover:bg-slate-300 p-4 gap-3 justify-center text-xl font-medium bg-slate-50 "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
        >
          Place Order <ArrowRightCircleFill size={30} />
        </button>
      </div>
    </div>
  );
}

/**box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
