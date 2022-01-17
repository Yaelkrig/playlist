import { useState } from 'react/cjs/react.development'
import './ItemForm.css'

const ItemForm = ({ addSong, inputRef, searchSong }) => {
    const [value, setValue] = useState("")

    return <div className='ItemForm'>
        <form>
            <input ref={inputRef}
                placeholder='Enter song'
                type="text"
                onChange={(e) => { setValue(e.target.value) }}
                value={value}></input>

            <button className='search'
                onClick={(e) => {
                    e.preventDefault()
                    searchSong(value)
                }}></button>
        </form>

    </div>

    // return <div className='ItemForm'>
    //     <form >
    //         <input
    //             ref={inputRef}
    //             placeholder='Enter song'
    //             type="text"
    //             onChange={(e) => { setValue(e.target.value) }}
    //             value={value}
    //         ></input>
    //         <input
    //             placeholder='Enter artist'
    //             type="text"
    //             onChange={(e) => { setArtist(e.target.value) }}
    //             value={artist}
    //         ></input>
    //         <input
    //             placeholder='Enter url'
    //             type="text"
    //             onChange={(e) => { setUrl(e.target.value) }}
    //             value={url}
    //         ></input>
    //         <button className='add_song'
    //             onClick={(e) => {
    //                 e.preventDefault()
    //                 addSong(value, artist, url)
    //                 setValue("")
    //                 setUrl("")

    //             }}></button>

    //     </form>
    // </div>
}
export default ItemForm;