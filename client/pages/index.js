import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import HomeHeader from '../components/home_header'
import HomeTest from '../components/home_test'
import words_api from "../components/words_api"
import Head from 'next/head';
import jwt from 'jsonwebtoken';

const Home=()=>{
  const [loggedin, set_loggedin] = useState(false);
  const [dark_mode, set_dark_mode] = useState(false);
  const [time,set_time] = useState(0);
  const [words , set_words] = useState([]);
  const [total_words, set_total_words] = useState(100);

  const [ user_info , set_user_info ] = useState();

  useEffect(()=>{
    const token = localStorage.getItem("token")

    if(token){
      const user = jwt.decode(token);
      set_loggedin(true)
      set_user_info(user)
    }else{
      set_loggedin(false)
    }

    let temp = [];
    for(let i=0;i<total_words;i++){
      temp.push(words_api[ Math.floor(Math.random()*(words_api.length-1)) ]);
    }
    set_words(temp);
  },[])

  return(
    <>
    <Head>
      <title>EagleType | Test</title>
    </Head>

    <div className={styles.container} id={dark_mode && styles.dark_container}>
      <HomeHeader dark_mode={dark_mode} set_dark_mode={set_dark_mode} loggedin={loggedin} 
      user_info={user_info}/>

      <HomeTest dark_mode={dark_mode} time={time} set_time={set_time} words={words} 
      set_words={set_words} total_words={total_words} user_info={user_info} 
      set_user_info={set_user_info}/>
    </div>

    </>
  )
}

export default Home;