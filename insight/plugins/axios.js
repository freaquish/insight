export default function ({$axios, $route, redirect}){
    const pages = [404, 401]
    const exempted_pages = ['auth-login', 'auth-register']
    $axios.onError(error => {
        if(pages.includes(error.response.status) && !exempted_pages.includes($route.name)){
            redirect(`/error/${error.response.status}`)
        }
    })
}