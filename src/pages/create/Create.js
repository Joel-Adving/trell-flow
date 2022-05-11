import './Create.css'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [users, setUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore('projects')
    const history = useHistory()

    useEffect(() => {
        if (!documents) return
        setUsers(documents.map(user => ({ value: user, label: user.displayName })))
    }, [documents])

    const handleSubmit = async e => {
        e.preventDefault()
        setFormError(null)
        if (!category) return setFormError('Please select a project Category')
        if (assignedUsers.length < 1) return setFormError('Please assign the project to at least one user')

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid,
        }

        const assignedUsersList = assignedUsers.map(user => ({
            displayName: user.value.displayName,
            photoURL: user.value.photoURL,
            id: user.value.id,
        }))

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
        }

        await addDocument(project)
        if (!response.error) return history.push('/')
    }
    return (
        <div className="create-form">
            <h2>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input type="text" required onChange={e => setName(e.target.value)} value={name} />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea type="text" required onChange={e => setDetails(e.target.value)} value={details} />
                </label>
                <label>
                    <span>Project details:</span>
                    <input type="date" required onChange={e => setDueDate(e.target.value)} value={dueDate} />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select options={categories} onChange={option => setCategory(option)} />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select options={users} onChange={option => setAssignedUsers(option)} isMulti />
                </label>
                {!response.isPending && <button className="btn">Add project</button>}
                {response.isPending && (
                    <button className="btn" disabled>
                        Loading...
                    </button>
                )}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
