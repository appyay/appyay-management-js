export default function getParams(apiName, config, params = {}){
if(apiName === 'cd') {
    if (!config.apikey) {
        throw new Error('API key is missing')
    }
    params.apikey = config.apikey;
} 
return {params: params};
}