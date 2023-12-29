import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContact = ({ id, setId }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ctype, setCtype] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(
        `https://mern-project-1-volcanus.onrender.com/api/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const helper = api.data.contact;
      console.log("fetch single contact = ", helper);
      setName(helper.name);
      setGmail(helper.gmail);
      setPhone(helper.phone);
      setCtype(helper.ctype);
    };

    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Working",name,gmail,phone,ctype)
    try {
      if (!id) {
        const api = await axios.post(
          "https://mern-project-1-volcanus.onrender.com/api/addcontact",
          {
            name,
            gmail,
            phone,
            ctype,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(api);
        setId("")
      }else{
         const api = await axios.put(
           `https://mern-project-1-volcanus.onrender.com/api/${id}`,
           {
             name,
             gmail,
             phone,
             ctype,
           },
           {
             headers: {
               "Content-Type": "application/json",
             },
             withCredentials: true,
           }
         );
         toast.success(api.data.message, {
           position: "top-right",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
         });
        setId("");

      }

      // setName("");
      // setGmail("");
      // setPhone("");
      // setCtype("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="container my-5 "
        style={{
          width: "700px",
        }}
      >
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contact Type
            </label>
            <input
              value={ctype}
              onChange={(e) => setCtype(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {id ? (
            <button type="submit" className="btn btn-primary">
              Edit Contact
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Add Contact
            </button>
          )}
         
        </form>
      </div>
    </>
  );
};

export default AddContact;
