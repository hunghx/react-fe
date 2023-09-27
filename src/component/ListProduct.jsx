import { useEffect, useState } from "react";
import { Product } from "./Product";
import axios from "axios";

export const ListProduct = () => {
  const [list, setList] = useState([]);


  const handleDelete= (id)=>{
    axios
    .delete("http://localhost:9090/api/v1/product/"+id)
    .then(() => {
     getAll();
    })
    .catch((e) => console.log(e));
  }

  const getAll=()=>{
    axios
      .get("http://localhost:9090/api/v1/product")
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <button data-bs-toggle="modal" data-bs-target="#modalAdd">
        Add New Product
      </button>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th colSpan={2} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((pro) => (
            <Product key={pro.id} pro={pro} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="modalAdd"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">ProductName</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image
                </label>
                <input className="form-control" type="file" id="formFile" />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select>
                  <option value={true}>Ban</option>
                  <option value={false}>ko Ban</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
