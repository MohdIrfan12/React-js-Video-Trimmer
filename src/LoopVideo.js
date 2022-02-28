import React, {useState} from 'react'


 const LoopVideo = (props) => {

    const [formData, setFormData] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        console.log(e.target.value,"val888")
        setFormData(e.target.value)
        console.log(formData,"ngggg")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Time:
                </label>
                <input type='number'  name='startTime' onChange={handleChange}/>

                <label>
                    End Time:
                </label>
                <input type='number' name='endTime'/>

                <input type='submit' value='Submit'/>
            </form>           
        </div>
    )
}

export default  LoopVideo