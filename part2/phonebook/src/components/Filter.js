const Filter = ({value, onHandleChange}) => {
    return (
        <>
            filter shown with <input value = {value} onChange = {onHandleChange}/>
        </>
    )
}

export default Filter;