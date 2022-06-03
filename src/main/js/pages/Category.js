import React, {useState, useEffect} from 'react';

function Category() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("./api/categories")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCategories(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    return (
        <>
            <h2>Category</h2>
            {
                error ? <div>Error: {error.message}</div> :
                    !isLoaded ? <div>Loading...</div> :
                        <ul>
                            {categories.map(cat => (
                                <li key={cat.catcode}>
                                    {cat.catdesc}
                                </li>
                            ))}
                        </ul>
            }
        </>
    )
}

export default Category;