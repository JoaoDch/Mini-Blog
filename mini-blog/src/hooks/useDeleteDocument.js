import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

// collection: coleção de collections de post que vou usar
// addDoc: adicionar o documento no banco firebase
// timestamp: marca a hora em que o dado foi criado

const initialize = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case 'LOADING':
            return{loading: true, error: null}
        case 'DELETED_DOC':
            return{loading: false, error: null}
        case 'ERROR':
            return{loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialize);

    // deal with memory leak

    const [cancelled, setCancelled] = useState(false);

    const checkCancelledBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async (id) => {
        checkCancelledBeforeDispatch({
            type: 'LOADING',
        });

        try{

            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelledBeforeDispatch({
                type: 'DELETED_DOC',
                payload: deletedDocument,
            });
        
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: 'error',
                payload: error.message,
            });
        }
    }

    useEffect(()=> {
        return() => setCancelled(true)
    }, []);

    return{deleteDocument, response};
}