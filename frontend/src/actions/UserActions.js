import { USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";
import axios from "axios";


export const login = (email,password) => async(dispatch)=>{
    try {
            // setLoading(true);
            dispatch({type:USER_LOGIN_REQUEST})
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const { data } = await axios.post(
              "https://studytube.darshanv.website/api/v1/users/login",
              { email, password },
              config
            );
            dispatch({type:USER_LOGIN_SUCCESS,payload:data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            // setLoading(false);
            // navigate('/mynotes')
        } catch (error) {
            // setError(error.response.data.message)
            // setLoading(false)
            dispatch({
                type:USER_LOGIN_FAIL,
                payload:error.response && error.response.data.message ?error.response.data.message:error.message,
            })
        }
}

export const logout = () => (dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({type:USER_LOGIN_LOGOUT})
}

export const register = (name,email,password,pic) => async (dispatch) =>{
   try {

    dispatch({type:USER_REGISTER_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users/register",
      { name, email, password, pic },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS,payload:data });
    dispatch({type:USER_LOGIN_SUCCESS,payload:data})
    localStorage.setItem("userInfo", JSON.stringify(data));
         
   } catch (error) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
   }
}




export const updateProfile = (user) => async (dispatch,getState) => {
  try {
    dispatch({
      type:USER_UPDATE_REQUEST
    })

    const {
      userLogin:{userInfo}
    } = getState();


    const config ={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${userInfo.token}`

      }
    }

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users/profile",user,config
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};