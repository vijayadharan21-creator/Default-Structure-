let accesstoken;

export const setToken=(token)=>{
    accesstoken=token;
}
export const getToken=()=>{
    return accesstoken;
}