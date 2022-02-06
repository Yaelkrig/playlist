import { Input } from '@mui/material'
import { useState } from 'react/cjs/react.development'
import './ItemForm.css'

const ItemForm = ({ addSong, inputRef, searchSong }) => {
    const [value, setValue] = useState("")

    return <div className='ItemForm'>
        <form>
            <Input
                ref={inputRef}
                id="search"
                label="Search"
                // value={setUsernameValue(usernameValue)}
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