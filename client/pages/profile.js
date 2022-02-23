import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import styles from "../styles/profile.module.css"
import Head from "next/head"

const Profile=()=>{
    const [data, set_data] = useState({
        "name" : "",
        "email" : "",
        "scores" :[]
    });

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const temp_data = jwt.decode(token)
            set_data(temp_data)
            console.log(data)
        }
    },[])

    function reverse_arr(arr){
        let result = []
        for(let i=arr.length-1;i>-1;i--){
            result.push(arr[i])
        }
        return result;
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>EagleType | {data["name"]}</title>
            </Head>

            <div className={styles.header}>
                <span className={styles.name}>{data["name"]}</span>
                <span className={styles.email}>{data["email"]}</span>
            </div>

            <div className={styles.body}>
                {reverse_arr(data["scores"]).map((e,index)=>{
                    return(
                        <div className={styles.test}>
                            <div className={styles.test_sub_div_1}>
                                <span>Test {index+1}:</span>
                            </div>
                            <div className={styles.test_sub_div_2}>
                                <span>Speed : {e["speed"]}</span>
                                <span>Accuracy : {e["accuracy"]}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Profile