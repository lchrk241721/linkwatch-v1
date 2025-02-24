import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner'; // Make sure the path is correct

function App() {
    const [target, setUrl] = useState("");
    const [backlinks, setBacklinks] = useState([]);
    const [mode, setMode] = useState('');
    const [rawResponse, setRawResponse] = useState(null); // Add a state to store raw JSON response
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        // Simulate a delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };


    const fetchBacklinks = async () => {
        if(target && mode){
            try {
                const response = await axios.get(`http://localhost:5000/api/backlinks?target=${target}`);
                const data = response.data;
                setBacklinks(response.data.backlinks);
                setRawResponse(response.data); // Set the raw JSON response state
                setError(null);
                //console.log(response.data);
            } catch (err) {
                setError(err.message);
                setBacklinks([]);
                setRawResponse(null); // Reset raw response in case of error
            }
        }else{
            alert('Please enter the target and select a mode.');
        }
        
    };
    /*
    return (
        <div className="App">
            <h1>Backlink Checker</h1>
            <input 
                type="text" 
                value={target}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={fetchBacklinks}>Check Backlinks</button>
            
            {backlinks.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>URL From</th>
                            <th>URL To</th>
                            <th>Title</th>
                            <th>Anchor Text</th>
                            <th>ALT</th>
                            <th>No-Follow</th>
                            <th>Image</th>
                            <th>Image Source</th>
                            <th>Inlink Rank</th>
                            <th>Domain Inlink Rank</th>
                            <th>First Seen</th>
                            <th>Last Visited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backlinks.map((backlink, index) => (
                            <tr key={index}>
                                <td>{backlink.url_from}</td>
                                <td>{backlink.url_to}</td>
                                <td>{backlink.anchor_text}</td>
                                <td>{backlink.alt}</td>
                                <td>{backlink.nofollow ? "Yes" : "No"}</td>
                                <td>{backlink.image ? "Yes" : "No"}</td>
                                <td>{backlink.image_source}</td>
                                <td>{backlink.inlink_rank}</td>
                                <td>{backlink.domain_inlink_rank}</td>
                                <td>{backlink.first_seen}</td>
                                <td>{backlink.last_visited}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );*/
    return (
        <div className="App" class="container-fluid">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    
                    <span class="fs-4">LINKWATCH</span>
                </a>

                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About Us</a></li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Buy Pro</a>
                        
                    </li>
                    <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Contact Us</a></li>
                    
                    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Show a second modal and hide this one with the button below.
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Hide this modal and show the first with the button below.
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </ul>
                
                
            </header>
            <div class="input-group mb-3">
                <input 
                    type="text" 
                    value={target}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter Your Website URL"
                    className="form-control"
                />
                <select className="form-select form-select-sm" aria-label="Small select example" onChange={(e) => setMode(e.target.value)}>
                    <option selected disabled>Select Mode</option>
                    <option value="1">Domain with Subdomains</option>
                    <option value="2">Domain Only</option>
                    <option value="3">Exact URL</option>
                </select>
                <button
                    onClick={() => {
                        fetchBacklinks();
                        handleClick();
                    }}
                    className="btn btn-outline-primary"
                    type="button"
                    id="button-addon1"
                >
                LINKWATCH NOW!
                </button>
                <div>
                    {loading && <Spinner />}
                </div>
            </div>
            

            
            
            {backlinks.length > 0 && (
                <div class="table-responsive-xxl container-fluid">
                    <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            
                            <th>Backlink Page</th>
                            <th>Anchor Text</th>
                            <th>ALT</th>
                            <th>Nofollow</th>
                            <th>PA</th>
                            <th>DA</th>
                            <th>First Seen</th>
                            <th>Last Visited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backlinks.map((backlink, index) => (
                            <tr key={index}>
                                
                                <td>{backlink.url_from}</td>
                                <td>{backlink.anchor_text}</td>
                                <td>{backlink.alt}</td>
                                <td>{backlink.nofollow ? "Yes" : "No"}</td>
                                <td>{backlink.inlink_rank}</td>
                                <td>{backlink.domain_inlink_rank}</td>
                                <td>{backlink.first_seen}</td>
                                <td>{backlink.last_visited}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item disabled">
                        <a class="page-link">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
                </div>
                
            )}
        </div>
    );
    
}

export default App;
