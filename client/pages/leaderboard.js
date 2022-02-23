import { useEffect, useState } from "react";
import styles from "../styles/Leaderboard.module.css";
import Head from "next/head";

const Leaderboard=()=>{
    const [scores, set_scores] = useState([]);
    const [start, set_start] = useState(0);
    const [end, set_end] = useState(5);

    useEffect(async ()=>{
        const raw_data = await fetch("http://localhost:3001/getScores")
        let data = await raw_data.json()

        for(let i=0;i<data.length;i++){
            for(let j=0;j<data.length;j++){
                if(data[i]["speed"]>data[j]["speed"]){
                    const temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
        console.log(data);

        set_scores(data)

    },[])

    return(

        <div className={styles.container}>
            <Head>
                <title>EagleType | Leaderboard</title>
            </Head>

            <div className={styles.heading_div}>
                <span className={styles.heading}>Leaderboard</span>
            </div>

            <div className={styles.scores}>

                <div className={styles.scores_sub_div}>
                {scores.slice(start,end).map((e, index)=>{
                    return(
                        <div className={styles.score}>
                            <div className={styles.score_div_1}>
                                <span className={styles.name}>{index+start+1}. {e["name"]}</span>
                            </div>

                            <div className={styles.score_div_2}>
                                <span>Speed : {e["speed"]}</span>
                                <span>Accuracy : {e["accuracy"]}</span>
                            </div>
                        </div>
                    )
                })}
                </div>

                <div className={styles.nav_btns_div}>
                    <button className={styles.prev_btn} onClick={()=>{
                        if(start>1){
                            set_start(start-5);
                            set_end(end-5);
                        }
                    }}>Prev</button>

                    <button className={styles.next_btn} onClick={()=>{
                        if(end<scores.length){
                            set_start(start+5);
                            set_end(end+5)
                        }
                    }}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default Leaderboard;