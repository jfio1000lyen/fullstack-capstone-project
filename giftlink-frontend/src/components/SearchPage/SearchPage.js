import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {

    // Task 1: Define state variables
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [ageYears, setAgeYears] = useState(10);
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`;
                console.log(url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data);

            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results from API
    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();

            if (searchQuery) params.append("name", searchQuery);
            if (category) params.append("category", category);
            if (condition) params.append("condition", condition);
            if (ageYears) params.append("age_years", ageYears);

            const url = `${urlConfig.backendUrl}/api/search?${params.toString()}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error; ${response.status}`);
            }

            const data = await response.json();
            setSearchResults(data);

        } catch (error) {
            console.log("Search error:", error.message);
        }
    };

    const navigate = useNavigate();

    // Task 6: Navigation to details page
    const goToDetailsPage = (productId) => {
        navigate(`/gift/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>

                        <div className="d-flex flex-column gap-2">

                            {/* Task 3: Category dropdown */}
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            {/* Condition dropdown */}
                            <select
                                className="form-control"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            >
                                <option value="">Select Condition</option>
                                {conditions.map((cond, idx) => (
                                    <option key={idx} value={cond}>
                                        {cond}
                                    </option>
                                ))}
                            </select>

                            {/* Task 4: Age slider */}
                            <div>
                                <label>Max Age: {ageYears} years</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    value={ageYears}
                                    onChange={(e) => setAgeYears(e.target.value)}
                                    className="form-range"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Task 7: Search input */}
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search gifts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Task 8: Search button */}
                    <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {/* Task 5: Results */}
                    <div>
                        {searchResults.length === 0 ? (
                            <p>No results found</p>
                        ) : (
                            searchResults.map((item) => (
                                <div
                                    key={item._id}
                                    className="border p-2 mb-2 rounded"
                                    onClick={() => goToDetailsPage(item._id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h6>{item.name}</h6>
                                    <p>{item.category} | {item.condition}</p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchPage;