const apiRequest = async (url = '', methObject = null, errMsg = null) => {

    try{

        const response = await fetch(url, methObject)
        if(!response.ok) throw Error("Please Reload the Application.")

    }catch(err){
        errMsg = err
    }finally{
        return (errMsg)
    }

}

export default apiRequest