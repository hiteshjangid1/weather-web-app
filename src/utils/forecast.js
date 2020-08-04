var request=require('request')

var forecast=(lang,lat,callback)=>{

    url = 'http://api.weatherstack.com/current?access_key=9cdc17cee23d32471dce54c334473328&query='+encodeURIComponent(lang)+','+encodeURIComponent(lat)
    
    request({url,json:true},(error,{body})=>{
            if(error) {
                return callback({error:'Unable to connect Weather Service!'},undefined)
            } else if(body.error) {
                return callback({error:'Unable to find location!'},undefined)
            }
            else{
                   weather={
                       temperature:body.current.temperature,
                       feelslike:body.current.feelslike
                   }
                  return callback(undefined,weather)
            }
    })

}

module.exports=forecast