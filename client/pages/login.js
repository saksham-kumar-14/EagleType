import styles from "../styles/Auth.module.css"
import React , { useState } from 'react';
import Axios from 'axios'
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
    const [password_type, set_password_type] = useState("password")
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const router = useRouter()

    async function login_user(){
        const res = await Axios.post('http://localhost:3001/login', {
            email : email,
            password : password
        })

        const data = res.data;
        
        if(data.user){
            alert("USER FOUND!")
            localStorage.setItem("token", data.user)
            router.push("./")
        }else{
            alert("USER NOT FOUND ..")
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>EagleType | Login</title>
            </Head>

            <div><h3 className={styles.heading}>LOGIN</h3></div>

            <div className={styles.subcontainer}>
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

                    <button onClick={()=>{
                        login_user()
                    }} className={styles.submit_btn}>Submit</button>
                </div>
            </div>

            <div className={styles.info_div}>
                <span className={styles.info}>
                    Not Registered? Then, <a href="./register" className={styles.info_a}>Register</a>
                </span>
            </div>

        </div>
    )
}

export default Login