import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import requestReducer, { REQUEST_STATUS } from '../reducers/request';

import {
    GET_ALL_FAILURE,
    GET_ALL_SUCCESS,
    PUT_FAILURE,
    PUT_SUCCESS,
  } from '../actions/request';

const useRequest = (baseUrl, routeName) => {
    const [{ records, status, error }, dispatch] = useReducer(
        requestReducer,
        {
        records: [],
        status: REQUEST_STATUS.LOADING,
        error: null,
        },
    );

    // the useEffect callback function is called when the 
    // component is ready to be interacted with. This is similar
    // to componentDidMount if we were using React classes.
    useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/${routeName}`);
                    dispatch({
                        type: GET_ALL_SUCCESS,
                        records: response.data,
                    });
                } catch (e) {
                    dispatch({
                        type: GET_ALL_FAILURE,
                        error: e,
                });
            }
        };
        fetchData();
    }, [baseUrl, routeName] /* This is the react hook dependeny array. This is a list of objects, state and
    props, that when changed, cause a rerender of the page. */);

    const propsLocal = {
        records,
        status,
        error,
        put: async (record) => {
            try {
                await axios.put(`${baseUrl}/${routeName}/${record.id}`, record);
                dispatch({
                    type: PUT_SUCCESS,
                    record: record,
                });
            } catch (e) {
                dispatch({
                    type: PUT_FAILURE,
                    error: e,
                });
            }
       }
    };

    return propsLocal;
};

export default useRequest;
