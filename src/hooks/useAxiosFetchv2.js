import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetchv2 = (baseUrl, flag) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    
    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()
        const fetchData = async (url) => {
            setIsLoading(true)
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token,
                })
                if(isMounted && response.data){
                    console.log(response.data)
                    if(flag === 1)
                        {
                           setData(response.data.questions) 
                        }
                    
                    setFetchError(null)
                }
            } catch (err)
            {
                if(isMounted)
                {
                    setData([])
                    setFetchError(err.message)
                }
            }finally{
                isMounted && setIsLoading(false)
            }
        }

        fetchData(baseUrl)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }
        return cleanUp
    }, [baseUrl])
  return ({data, isLoading, fetchError})
}

export default useAxiosFetchv2