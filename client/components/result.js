import words_api from "./words_api"
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import Axios from 'axios'
import jwt from 'jsonwebtoken'

const Result=({ dark_mode , score, set_score, set_words, time, set_time, total_words, set_result, set_words_num, user_info , set_user_info})=>{
    if(time===0){ time = 0.001; }
    const speed = (((score/time)*60).toString()).slice(0,5)
    const accuracy = ((score/total_words)*100).toString() + "%";
    
    useEffect(()=>{
        if(localStorage.getItem("token")!==null){
            update_user()
        }
    },[])

    function update_user(){
        let new_user_info = {}
        new_user_info["email"] = user_info["email"]
        new_user_info["password"] = user_info["password"]
        new_user_info["name"] = user_info["name"]
        new_user_info["scores"] = user_info["scores"]

        new_user_info["scores"].push({
            "speed" : speed,
            "accuracy" : accuracy
        })

        set_user_info(user_info)

        Axios.post("http://localhost:3001/updateUser" , {
            "email" : new_user_info["email"],
            "scores" : new_user_info["scores"]
        })

        const token = jwt.sign({
            name : new_user_info["name"],
            email : new_user_info["email"],
            password : new_user_info["password"],
            scores : new_user_info["scores"]
        },"secret")

        localStorage.setItem("token",token)

        Axios.post("http://localhost:3001/updateScores" , {
            "name" : new_user_info["name"],
            "speed" : parseFloat(speed),
            "accuracy" : accuracy
        })
    }

    return(
        <div className={styles.result_div} id={dark_mode && styles.result_div}>
            <div className={styles.result_sub_div} id={dark_mode && styles.result_sub_div}>
            
            <h3>RESULT</h3>
            <p>Your typing speed was <span className={styles.speed}>{speed}</span> words per minute with <span className={styles.accuracy}>{accuracy}</span> accuracy</p>
            <button className={styles.retest_btn} id={dark_mode && styles.retest_btn} onClick={()=>{
                set_score(0)
                set_time(0)
                let arr = []
                for(let i=0;i<total_words;i++){
                    arr.push( words_api[ Math.floor( Math.random()*(words_api.length-1) ) ] )
                }
                set_words(arr)
                set_result(false)
                set_words_num(0)

            }}>Re-test</button>
            
            </div>
        </div>
    )
}

export default Result 