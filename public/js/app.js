console.log('This is client side JS file')

var weatherform=document.querySelector('form')
var search=document.querySelector('input')
var field=document.querySelector('#msg1')
var field2=document.querySelector('#msg2')

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()

    field.textContent = 'Loading...'
    field2.textContent = ''

    var location=search.value

    var x = "http://localhost:3000/weather?address="+encodeURIComponent(location)

    fetch(x).then((response) => {

        

        response.json().then((data) => {
            if (data.error) {
                field.textContent=''
                field2.textContent = data.error
            }
            else {
                field.textContent ="Address: "+data.address
                field2.textContent="Temperature: "+data.temperature

                // console.log("Address:", data.address)
                // console.log("Temperature:", data.temperature)
                // console.log("Feels Like:", data.feelslike_temperature)
            }

        })
    })
})

