import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetContact = ({ id, setId }) => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  const [counter, setcounter] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  const deleteContact = async (id) => {
    const api = await axios.delete(
      `https://mern-project-1-volcanus.onrender.com/api/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(api);
    setcounter(counter + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      const api = await axios.get(
        "https://mern-project-1-volcanus.onrender.com/api/getcontacts",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // const data = await api.json();
      //  console.log(api.data.contacts);
      setContact(api.data.contacts);
      setIsLoader(false);
    };
    console.log("Contact State data = ", contact);
    fetchData();
    console.log("UseEffect is Running..!");
  }, [counter]);

  const EditContact = (id) => {
    setId(id);
    navigate("/addcontact");
  };

  return (
    <>
      {isLoader ? (
        <div>loader...</div>
      ) : (
        <div className="container">
          {contact.map((data) => {
            return (
              <>
                <div
                  className="container my-5 bg-primary text-center p-5 text-light"
                  key={data._id}
                >
                  <h1>{data.name}</h1>
                  <h2>{data.phone}</h2>
                  <h3>{data.gmail}</h3>
                  {data.ctype ? (
                    <button className="btn btn-warning mx-3">Personal</button>
                  ) : (
                    <button className="btn btn-danger mx-3">
                      Proffesional
                    </button>
                  )}
                  <button
                    onClick={() => EditContact(data._id)}
                    className="btn btn-info mx-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(data._id)}
                    className="btn btn-danger mx-3"
                  >
                    Delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default GetContact;
