import { Input } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import './ItemForm.css'

const ItemForm = ({ addSong, searchSong }) => {
    const [value, setValue] = useState("")
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    })
    return <div className='ItemForm'>
        <form>
            <Input
                ref={inputRef}
                id="search"
                label="Search"
                placeholder='Search'
                name="search"
                autoComplete="search"
                onChange={(e) => { setValue(e.target.value) }}
                value={value}
                color='success'
            >
            </Input>

            <button className='search'
                onClick={(e) => {
                    e.preventDefault()
                    searchSong(value)
                }}></button>
        </form>

    </div>

}
export default ItemForm;