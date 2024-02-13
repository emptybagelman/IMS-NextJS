import { useEffect, useState } from "react";


// Custom hook used for searching.
// Rather than calling API fetch on every keypress,
// it makes the request once timeout 'delay' variable expires.
// Timeout resets on value change when within delay.
// Returns once no more input changes in delay window.

// When using for an input field search:
//
// const [input, setInput] = useState("")
// const debouncedInput = useDebounce(input, <delay> )
//  
// useEffect(() => {
//   fetch(`some-url/${ debouncedInput })
// }, [ debouncedInput ])

export default function useDebounce(value:any, delay:number){
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [value])

    return debouncedValue
}