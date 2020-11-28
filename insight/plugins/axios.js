export default function ({$axios, redirect}){
    const pages = [404, 401]
    $axios.onError(error => {
        if(pages.includes(error.response.status)){
            redirect(`/error/${error.response.status}`)
        }
    })
}