var request=require('request')

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGpidWRkeSIsImEiOiJja2Q5b2Y5NG8wOXpnMzNyeGJjZ2hyZmh2In0.61ybTjAGqJlxebs1O9t_Mg'

    request({url, json: true }, (error, {body}) => {
        if (error) {
            return callback({error:'Unable to connect Location services!'}, undefined)
        } else if (body.features.length === 0) {
            return callback({ error: 'Unable to find Location...try again!'}, undefined)
        } else {
           return callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode