import { useEffect, useState } from "react";
import { Product } from "./Product";
import axios from "axios";
const initProduct = {
  name:"",
  price:0,
  file:null,
  description:"",
  status:true
}
const initEditProduct = {
  id:null,
  name:"",
  price:0,
  file:null,
  description:"",
  status:true
}

export const ListProduct = () => {
  const [list, setList] = useState([]);
  const [isLoading,setLoading]=useState(false);
  const [imgUrl,setImgUrl]=useState("");
  const [newProduct, setNewProduct] = useState(initProduct)
  const [updateProduct, setUpdateProduct] = useState(initEditProduct)

  const onChangeInputData=(e)=>{
    let name  = e.target.name;  
    let value = e.target.value;
    setNewProduct({...newProduct,[name]:value})
  }

  const onChangeFile =(e)=>{
      setNewProduct({...newProduct, file: e.target.files[0]});
  }
  const onChangeUpdateInputData=(e)=>{
    let name  = e.target.name;  
    let value = e.target.value;
    setUpdateProduct({...updateProduct,[name]:value})
  }

  const onChangeUpdateFile =(e)=>{
      setUpdateProduct({...updateProduct, file: e.target.files[0]});
  }

  const handleEdit=(id)=>{
      let edit = list.find((item)=>item.id ==id)
      setImgUrl(edit.imageUrl)
      setUpdateProduct({...edit,id:id})
  }

  const handleAdd=()=>{
    let data = new FormData();
    for(let key in newProduct) {
        data.append(key, newProduct[key]);
    }
    setLoading(true)

    axios({
      method: "post",
      url: "http://localhost:9090/api/v1/product",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log("success",response);
        getAll();
        setLoading(false)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  const handleUpdate=()=>{
    let data = new FormData();
    for(let key in updateProduct) {
         data.append(key, updateProduct[key])
    }
  
    setLoading(true)

    axios({
      method: "put",
      url: `http://localhost:9090/api/v1/product/${updateProduct.id}`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log("success",response);
        getAll();
        setLoading(false)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

 
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
    {isLoading?<div className="box-loading">
      <span className="loader"></span>
    </div>:""}
    
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
            <Product key={pro.id} pro={pro} handleDelete={handleDelete} handleEdit={handleEdit}/>
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
                <input type="text" className="form-control" name="name" onChange={(e)=>onChangeInputData(e)}  value={newProduct.name}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" onChange={(e)=>onChangeInputData(e)} name="price" value={newProduct.price}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} onChange={(e)=>onChangeInputData(e)} name="description" value={newProduct.description}/>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image
                </label>
                
                <input className="form-control" type="file"  name="file" onChange={(e)=>onChangeFile(e)}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" onChange={(e)=>onChangeInputData(e)} value={newProduct.status}>
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
              <button onClick={handleAdd} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalEdit"
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
                <label className="form-label">ProductID</label>
                <input type="text" readOnly className="form-control"  value={updateProduct.id}/>
              </div>
              <div className="mb-3">
                <label className="form-label">ProductName</label>
                <input type="text" className="form-control" name="name" onChange={(e)=>onChangeUpdateInputData(e)}  value={updateProduct.name}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" onChange={(e)=>onChangeUpdateInputData(e)} name="price" value={updateProduct.price}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} onChange={(e)=>onChangeUpdateInputData(e)} name="description" value={updateProduct.description}/>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image
                </label>
                <div>
                  <img src={imgUrl} width={50} height={50} style={{objectFit:"cover"}} alt="#"/>
                </div>
                <input className="form-control" type="file"  name="file" onChange={(e)=>onChangeUpdateFile(e)}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" onChange={(e)=>onChangeUpdateInputData(e)} value={updateProduct.status}>
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
              <button onClick={handleUpdate} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
