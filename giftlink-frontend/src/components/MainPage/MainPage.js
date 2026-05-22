import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 1: Fetch gifts from backend
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setGifts(data);

            } catch (error) {
                console.error("Error fetching gifts:", error.message);
            }
        };

        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/gift/${productId}`);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown date";
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const getConditionClass = (condition) => {
        return condition === "New"
            ? "list-group-item-success"
            : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift._id || gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">

                            {/* Task 4: Display gift image or placeholder */}
                            {gift.image ? (
                                <img
                                    src={gift.image}
                                    className="card-img-top"
                                    alt={gift.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            ) : (
                                <div
                                    className="card-img-top d-flex align-items-center justify-content-center bg-light"
                                    style={{ height: "200px" }}
                                >
                                    No Image Available
                                </div>
                            )}

                            <div className="card-body">

                                {/* Task 5: Gift name */}
                                <h5 className="card-title">{gift.name}</h5>

                                {/* Condition */}
                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    {gift.condition}
                                </p>

                                {/* Task 6: Date */}
                                <p className="card-text">
                                    <small className="text-muted">
                                        Added: {formatDate(gift.date_added)}
                                    </small>
                                </p>

                                <button
                                    onClick={() => goToDetailsPage(gift._id || gift.id)}
                                    className="btn btn-primary"
                                >
                                    View Details
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;