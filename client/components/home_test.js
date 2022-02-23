import React, { useEffect } from "react";
import styles from "../styles/Home.module.css"
import { useState } from "react";
import Result from './result';

const HomeTest=({ dark_mode , time, set_time , words , set_words , total_words , user_info , set_user_info })=>{
    const [current_word, set_current_word] = useState("");
    const [words_num, set_words_num] = useState(0);
    const [result, set_result] = useState(false);
    const [score, set_score] = useState(0);
    const [start_timer, set_start_timer] = useState(false);

    useEffect(()=>{
        if(start_timer){
            setTimeout(()=>{
                set_time(time+1)
            },1000)
        }
    })

    function update_progress(new_current){
        if(!result){
            set_start_timer(true)
        }
        set_current_word(new_current)
        if(new_current[new_current.length-1] === " "){
            if(words[words_num] === new_current){
                set_score(score+1);
            }
            set_current_word("")
            set_words_num(words_num+=1)
        }

        if(words_num===total_words){
            set_start_timer(false)
            set_result(true)       
        }
    }

    return(
        <>
        <div className={styles.test}>
            <span className={styles.test_time}>TIME : {time}</span>

            <div className={styles.words_div}>
                <div className={styles.words_sub_div}>
                { words.map((e,index)=>{
                    if(words_num===index){ return <span className={styles.current_word}>{e}</span> }
                    else if(words_num>index){ return <span className={styles.completed_word}>{e}</span> }
                    else{ return <span className={styles.uncompleted_word}>{e}</span> }
                }) }
                </div>
                <input onChange={(e)=>{
                    update_progress(e.target.value);
                }} value={current_word} className={styles.words_input} id={dark_mode && styles.words_input}></input>
            </div>

            <div className={styles.restart_div}>
                <button className={styles.restart_btn} onClick={()=>{
                    set_score(0)
                    set_start_timer(false)
                    set_words_num(0)
                    set_current_word("")
                    set_time(0)
                }}>Restart</button>
            </div>
        </div>

        {result && <Result dark_mode={dark_mode} score={score} set_score={set_score} set_words={set_words}
        time={time} set_time={set_time} total_words={total_words} 
        set_result={set_result} set_words_num={set_words_num} 
        user_info={user_info} set_user_info={set_user_info} />}
        </>
    )
}

export default HomeTest;