import styles from "../styles/Auth.module.css"
import React , { useState } from 'react';
import Axios from "axios";
import {useRouter} from "next/router"
import Head from "next/head";

const Regsiter=({ all_users })=>{
    const [password_type, set_password_type] = useState("password");
    const [password, set_password] = useState("");
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const router = useRouter()

    function create_user(){
        Axios.post('http://localhost:3001/createUser', {
            name: name,
            email: email,
            password: password,
            scores : []
        }).then((res)=>{
            alert("User created!")
            router.push('/login')
        }).catch((res)=>{
            alert("Error occured")
            console.log(res)
        })
    }

    function email_exists(){
        let result = false;

        all_users.map((e)=>{
            if(e["email"] === email){
                result = true;
            }
        })

        return result
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>EagleType | Register</title>
            </Head>
            
            <div>
                <h3 className={styles.heading}>REGISTER</h3>
            </div>
            <div className={styles.subcontainer}>

                <div className={styles.input_div}>
                <label className={styles.label}>Name</label>
                <input onChange={(e)=>{
                    set_name(e.target.value)
                }} className={styles.input} placeholder="Name" type="text"></input>
                </div>

                <div className={styles.input_div}>
                <label className={styles.label}>Email</label>
                <input onChange={(e)=>{
                    set_email(e.target.value)
                }} className={styles.input} placeholder="Email" type="email"></input>
                </div>

                <div className={styles.input_div}>
                <label className={styles.label}>Password</label>
                <div className={styles.password_input}>
                    <input onChange={(e)=>{
                        set_password(e.target.value)
                    }} placeholder="Password" type={password_type}></input>
                    <button onClick={()=>{
                        if(password_type==="password"){ set_password_type("text") }
                        else{ set_password_type("password") }
                    }} className={styles.show_btn}>Show</button>
                </div>
                </div>

                <button onClick={()=>{
                    if(!email_exists()){
                        create_user()
                    }else{
                        alert("This email already exists! Try to login");
                    }

                }} className={styles.submit_btn}>Submit</button>

            </div>

            <div className={styles.info_div}>
                <span className={styles.info}>Already registered? Then, <a className={styles.info_a} href="./login">Login</a></span>
            </div>

        </div>
    )
}

export async function getServerSideProps(){
    const raw_data = await fetch("http://localhost:3001/getUsers")
    const data = await raw_data.json()

    return{
        props:{
            all_users : data 
        }
    }
}

export default Regsiter;