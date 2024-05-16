import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useAxiosPost = (baseUrl, payload) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [postError, setPostError] = useState(null)
    
    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()
        const postData = async (url, body) => {
            setIsLoading(true)
            try{
                const response = await axios.post(url, body)
                if(isMounted && response.data){
                    console.log(response.data)
                    setData(response.data)
                    setPostError(null)
                }
            } catch (err)
            {
                if(isMounted)
                {
                    setData([])
                    setPostError(err.message)
                }
            }finally{
                isMounted && setIsLoading(false)
            }
        }

        postData(baseUrl, payload)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }
        return cleanUp
    }, [baseUrl])
  return ({data, isLoading, postError})
}

export default useAxiosPost