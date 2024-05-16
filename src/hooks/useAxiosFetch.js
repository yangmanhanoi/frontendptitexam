import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (baseUrl, page, pageSize, timeOption, sortOption) => {
    let params = {
        page: page,
        pageSize: pageSize,
        field: sortOption,
        sort: 'acs'
    }
    if(timeOption !== 'all'){
        params.dateOrder = timeOption
    }
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [registerId, setRegisterId] = useState(-1)
    
    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()
        const fetchData = async (url) => {
            setIsLoading(true)
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token,
                    params : params
                })
                if(isMounted && response.data.content && Array.isArray(response.data.content)){
                    console.log(response.data.content)
                    setTotalPages(response.data.totalPages)
                    setData(response.data.content)
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
    }, [baseUrl, page, pageSize, timeOption, sortOption])
  return ({data, isLoading, fetchError, totalPages})
}

export default useAxiosFetch