import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import requestReducer, { REQUEST_STATUS } from '../reducers/request';
import { store } from 'react-notifications-component';

import {
    GET_ALL_FAILURE,
    GET_ALL_SUCCESS,
    PUT_FAILURE,
    PUT_SUCCESS,
    PUT
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

    // To be safe we use React.useRef to guarantee that our reference
    // to the axios token is not disposed of during the lifetime of our component.
    // That is when the cleanup method of the component is called, we are
    // guaranteed to have this token reference.
    const signal = React.useRef(axios.CancelToken.source());

    // the useEffect callback function is called when the 
    // component is ready to be interacted with. This is similar
    // to componentDidMount if we were using React classes.
    useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/${routeName}`, {
                        cancelToken: signal.current.token
                    });
                    dispatch({
                        type: GET_ALL_SUCCESS,
                        records: response.data,
                    });
                } catch (e) {
                    console.log('Loading data error', e);
                    if (axios.isCancel(e)) {
                        console.log('Get request is cancelled');
                    }
                    else {
                        dispatch({
                            type: GET_ALL_FAILURE,
                            error: e,
                        });
                    }
            }
        };
        fetchData();
        // In the cleanup method, before the component finally closes,
        // we call cancel on the axios token.
        return () => {
            console.log('Unmount and cancel running axios request.');
            signal.current.cancel();
        }
    }, [baseUrl, routeName] /* This is the react hook dependeny array. This is a list of objects, state and
    props, that when changed, cause a rerender of the page. */);

    const propsLocal = {
        records,
        status,
        error,
        // The useCallback hook memoizes our callback so it doesn't force a rerender.
        put: React.useCallback(async (record) => {
            try {
                dispatch({
                    type: PUT,
                    record,
                });
                await axios.put(`${baseUrl}/${routeName}/${record.id}`, record);
                dispatch({
                    type: PUT_SUCCESS,
                    record: record,
                });
                store.addNotification({
                    title: 'Favorite Status Updated',
                    message: `Speaker: ${record.firstName} ${record.lastName}`,
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animated', 'fadeIn'],
                    animationOut: ['animated', 'fadeOut'],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
            } catch (e) {
                dispatch({
                    type: PUT_FAILURE,
                    error: e,
                });
                store.addNotification({
                    title: 'Favorite Status Update Failure.  Setting Back...',
                    message: `Speaker: ${record.firstName} ${record.lastName}`,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animated', 'fadeIn'],
                    animationOut: ['animated', 'fadeOut'],
                    dismiss: {
                      duration: 3000,
                      onScreen: true,
                    },
                  });
            }
       }, [])
    };

    return propsLocal;
};

export default useRequest;
