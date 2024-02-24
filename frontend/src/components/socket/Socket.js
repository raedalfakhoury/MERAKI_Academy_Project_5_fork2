import React ,{useState} from "react";
import { io } from "socket.io-client";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Socket() {
    const [value_io_message,set_value_io_message] =useState("")
  return (
    <>
      <main className="content" >
        <div className="container mt-3">
        <div className="card w-100 text-container border-white">
          <div className="row">
       
              <div style={{display:"flex",justifyContent:"center"}}>
                <h5>Enter username</h5>
              </div>
     

            <div className="d-flex justify-content-center py-1">
              <div className="col-3">
                {" "}
                <input
                  type="text"
                  name="username"
                  value={value_io_message}
                  className="form-control"
                  placeholder="username"
                  autoComplete="off"
                  onChange={(e)=>{
                    set_value_io_message(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  );
}

export default Socket;
