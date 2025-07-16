import { useEffect, useState } from "react";

// T generic means the hook can be used with any type of data
// fetchFunctions is a function that returns a Promise of type T
// autoFetch is a boolean that determines if the fetch should happen automatically on mount
const useFetch = <T>(fetchFunctions: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null); // data can be of any type T or null initially
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        
        try {
            setLoading(true);
            setError(null); // Reset error state before fetching

            const result = await fetchFunctions();
            
            setData(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            } else {
                setError(new Error("An unknown error occurred"));
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to reset the state
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    // Expose the state and fetch function
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;