import React from 'react';
import Font from 'react-font';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {

        fetch('https://gentle-fortress-91581.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert("Successfully Added");
                    reset();
                } else {
                    alert("Failed");
                }
            })

    }
    return (
        <div>
            <div>
                <Font family="Mochiy Pop One">
                    <h1 style={{ textAlign: "center", paddingTop: 3, marginTop: 20, marginBottom: 40, color: "#3F000F", fontSize: "40px" }}>Add Product</h1>

                </Font>
                <form className=" container w-50" onSubmit={handleSubmit(onSubmit)}>

                    <input type="text" className="form-control" aria-label="Username" placeholder="Product Name" aria-describedby="basic-addon1" required  {...register("name")} />
                    <br />

                    <input type="text" className="form-control" aria-label="Username" placeholder="Image url" aria-describedby="basic-addon1" {...register("image", { required: true })} />
                    <br />
                    <input type="text" className="form-control" aria-label="Username" placeholder="Description" aria-describedby="basic-addon1" {...register("details", { required: true })} />
                    <br />
                    {errors.email && <span className="error">This field is required</span>}

                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="Category?(sony/nikon/panasonic)" defaultValue="" {...register("category")} /> <br />

                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="Offer" defaultValue="" {...register("offfer")} /> <br />
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="Rating" defaultValue="" {...register("rating", { required: true })} /> <br />
                    <input type="number" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="Price" defaultValue="" {...register("cost", { required: true })} /> <br />

                    <input style={{ borderRadius: "20px", padding: "10px 50px", border: "none", color: "#3F000F", backgroundColor: "#E0FFFF", fontWeight: "bold" }} type="submit" />

                </form>
            </div>
        </div >
    );
};

export default AddProduct;