import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunctions: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
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