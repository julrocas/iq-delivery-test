import React, { useState, useEffect } from 'react';
import Axios, { AxiosError, AxiosRequestConfig, AxiosPromise, Method, AxiosResponse } from 'axios';

interface IRequest<T, H = any> {
    method?: Method;
    path: string;
    headers?: H;
    body?: T;
    params?: {[k: string]: any};
}

interface IRequestError {
    message: string;
    reason: string;
}

interface ISendParams<T = any>{body?: T, params?: {[k:string]: any}}

const getAuthorizationHeader = () => {
    const header = {};
    const isBrowser = typeof window !== 'undefined';
    if ( isBrowser && !!localStorage.getItem('access_token')) {
        const token = localStorage.getItem('access_token');
        header["Authorization"] = token;
    }
    return header;
}

export default function useApi<IRequestBody = any, IResultData = any>(request: IRequest<IRequestBody>): 
    [{response: AxiosResponse<IResultData>, loading: boolean, error: AxiosError<IRequestError>}, (requetParams?: ISendParams<IRequestBody>) => void] {
    
    const [response, setResponse] = useState<AxiosResponse<IResultData> | undefined>();
    const [error, setError] = useState<AxiosError<IRequestError> | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const method = request.method || "GET";
    const authorization = getAuthorizationHeader();

    const defaultConfig = {
        baseURL: "https://iq-restaurants-development.herokuapp.com/api/v1",
        method,
        headers: {...request.headers, ...authorization},
        data: method !== "GET" ? request.body : undefined,
        url: request.path,
        params: method === "GET" ? request.params : undefined,
    }

    const sendRequest = async (requestParams: ISendParams<IRequestBody>) => {
        setLoading(true);
        
        let config  = {...defaultConfig, url: request.path};
       
        if(requestParams) {
            if(requestParams.body) {
                config.data = requestParams.body;
            }
            if (requestParams.params) {
                config.params = requestParams.params;
            }
        }
        
        try {
            const response = await Axios(config);
            setError(undefined)
            setLoading(false);
            setResponse(response as AxiosResponse<IResultData>);
        } catch (err) {
            if (err && err.response) {
                setError(err as AxiosError<IRequestError>)
                setResponse(undefined);

            }
            setLoading(false);
        }
    }

    return [{ response, loading, error }, sendRequest];
}