export default function ProxyDetection(){
    if(window.location.href.includes('localhost:7777')) return 'http://localhost:3000'
    return
}