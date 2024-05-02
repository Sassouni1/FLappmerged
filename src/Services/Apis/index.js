import {BASE_URL} from '../Constants';
import axios from 'axios';

export const ApiCall = async ({params, route, verb, token, baseurl}) => {
  try {
    let url = null;
    if (baseurl == false) {
      url = route;
    } else {
      url = `${BASE_URL}/${route}`;
    }
    console.log('url',url)
    console.log('params',params)

    let response = null;
    switch (verb) {
      case 'get':
        response = await axios.get(
          url,
        
          token ? {headers: {'x-sh-auth': token}} : null,

        );
        break;
      case 'post':
        response = await axios.post(
          url,
          params,

          token ? {headers: {'x-sh-auth': token}} : null,

        );
        break;
      case 'put':
        response = await axios.put(
          url,
          params,
          token ? {headers: {'x-sh-auth': token}} : null,

        );
        break;
      case 'patch':
        response = await axios.patch(
          url,
          params,
          token ? {headers: {'x-sh-auth': token}} : null,

        );
        break;
      case 'delete':
        response = await axios.delete(
          url,
          token ? {headers: {'x-sh-auth': token}} : null,

          params,
        );
        break;

      default:
        return {code: '400', response: 'methord not found'};
        break;
    }

    if (response) {
   
      return await {status: 200, response: response.data};
    } else {
      return response;
    }
  } catch (e) {
    // handle error
    console.log('ress',e?.response)

    return {
      status: 400,
      response: e?.response?.data ? e?.response?.data : {message: e.toString()},
    };
  }
};
