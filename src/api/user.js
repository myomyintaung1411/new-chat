import network from './request.js'

export function AgentLogin(data) {
   // console.log('data ... ', data)
    return network({
        url: '/client_signIn',
        method: 'post',
        data
    })
}
export function Upload(data) {
   // console.log('data ... ', data)
    return network({
        url: '/upload',
        method: 'post',
        data
    })
}
