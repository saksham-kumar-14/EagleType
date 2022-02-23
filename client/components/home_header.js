import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Axios from 'axios'

const HomeHeader = ({dark_mode, set_dark_mode, loggedin , user_info}) => {
    const router = useRouter();
    
    function logout(){
      localStorage.removeItem("token")
      router.push("./login")
    }

    async function delete_user(){
      localStorage.removeItem("token")
      const res = await Axios.post("http://localhost:3001/deleteUser" , {
        email : user_info["email"]
      })
      const data = res.data
      if(data.updated){
        alert("USER DELETED")
      }else{
        alert("SOME ERROR OCCURED")
      }

      router.push("./register")
    }

    return(
        <div className={styles.subcontainer}>
        <div className={styles.heading_div}>
          <h1 className={styles.heading}>EAGLETYPE</h1>
        </div>

        {loggedin ? 
        <div>
        <div className={styles.auth_div}>
          <button onClick={()=>{
            logout()
          }} className={styles.logout_btn} id={dark_mode?styles.logout_btn:""}>Logout</button>
          <button onClick={()=>{
            delete_user()
          }} className={styles.delete_user_btn}>Delete User</button>
        </div>
        <div className={styles.scores_div}>
          <button onClick={()=>{
            router.push("./leaderboard")
          }} className={styles.leaderboard}>LeaderBoard</button>
          <button onClick={()=>{
            router.push("./profile")
          }} id={dark_mode?styles.profile_btn:""} className={styles.profile}>{user_info["name"]}</button>
        </div>
        </div>
        : 
        <div className={styles.auth_div}>
          <button onClick={()=>{
              router.push("./login")
          }} className={styles.login_btn} id={dark_mode && styles.login_btn}>Login</button>
          <button onClick={()=>{
              router.push("./register")
          }} className={styles.register_btn} id={dark_mode && styles.login_btn}>Register</button>
        </div>}

          {dark_mode? 
          <div className={styles.dark_mode_div}>
            <div className={styles.dark_mode_sub_div} id={styles.dark_mode_sub_div}>
              <button className={styles.dark_mode_btn} onClick={()=>{
                set_dark_mode(!dark_mode)
              }}></button>
              <img className={styles.dark_mode_img} src='/moon.png'></img>
            </div>
          </div> : 
          <div className={styles.dark_mode_div}>
            <div className={styles.dark_mode_sub_div}>
              <img className={styles.dark_mode_img} src='/sun.png'></img>
              <button className={styles.dark_mode_btn} onClick={()=>{
                set_dark_mode(!dark_mode)
              }}></button> 
            </div>
          </div> } 


      </div>
    )
}

export default HomeHeader;