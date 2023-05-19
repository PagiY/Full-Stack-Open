const PersonForm = ({onSubmit, numValue, nameValue, onHandleChangeName, onHandleChangeNum}) => {
    return(
        <form onSubmit = {onSubmit}>
            <div>
                name: <input value = {nameValue} onChange = {onHandleChangeName}/>
            </div>
            <div>
                number: <input value = {numValue} onChange = {onHandleChangeNum}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;