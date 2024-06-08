import axios from "axios";


export const commonApi=async(httpRequestMethod,url,reqBody,reqHeader)=>{
const reqconfig={

    method:httpRequestMethod,
    url,
    data:reqBody,
    headers:reqHeader?reqHeader:{"content-type":"application/json"}
}
  return await axios(reqconfig).then((res)=>{return res}).catch((err)=>{return err})
}