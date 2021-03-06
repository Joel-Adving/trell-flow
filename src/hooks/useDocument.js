import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = db.collection(collection).doc(id)
        const unsub = ref.onSnapshot(
            snapshot => {
                if (!snapshot.data()) return setError('No such document exist')
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            },
            err => {
                console.log(err.message)
                setError('Failed to get documents')
            }
        )
        return () => unsub()
    }, [collection, id])

    return { document, error }
}
