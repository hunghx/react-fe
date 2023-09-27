
export const Product = ({pro,handleDelete}) => {
    let {id,name,price,imageUrl,status} = pro

    const handleDeleteProduct =(id)=>{
      if(window.confirm("Are you sure you want to delete ?")){
        handleDelete(id);
      }
    }
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td><img src={imageUrl} alt="" width={100} height={100} style={{objectFit:"cover"}} /></td>
      <td>price</td>
      <td>{status?"Bán":"Không bán"}</td>
      <td><button>Sửa</button></td>
      <td><button onClick={()=>handleDeleteProduct(id)}>Xóa</button></td>
    </tr>
  )
}
