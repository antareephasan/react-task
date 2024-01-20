import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './modal.css';
import DetailsModal from './DetailsModal';

const Problem2 = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showEvenIdContacts, setShowEvenIdContacts] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (modal) => {
        setActiveModal(modal);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setShowModal(false);
    };

    const fetchContacts = async (url, stateSetter) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            stateSetter(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleButtonClickAndFetch = async (modal, url, stateSetter) => {
        handleButtonClick(modal);
        await fetchContacts(url, stateSetter);
    };

    const handleCheckboxChange = () => {
        setShowEvenIdContacts((prev) => !prev);
    };

    const filterEvenIdContacts = (contacts) => {
        if (showEvenIdContacts) {
            return contacts.filter((contact) => contact.id % 2 === 0);
        }
        return contacts;
    };

    useEffect(() => {
        if (showModal && (activeModal === 'all' || activeModal === 'us')) {
            fetchContacts(activeModal === 'all' ? 'https://contact.mediusware.com/api/contacts/' : 'https://contact.mediusware.com/api/country-contacts/United%20States/', activeModal === 'all' ? setAllContacts : setUsContacts);
        }
    }, [showModal, activeModal]);


    const handleContactClick = (contact) => {
        console.log('Contact clicked:', contact);
        setSelectedContact(contact);
        setActiveModal('details');
        setShowModal(true);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleSearchChange = (event) => {

        clearTimeout(searchTimeout);

        const newQuery = event.target.value;

        const timeoutId = setTimeout(() => {
            handleSearch(newQuery);
        }, 300);

        setSearchTimeout(timeoutId);

        setSearchQuery(newQuery);
    };

    const handleSearch = async (query) => {
        try {
      
            const response = await fetch(`https://contact.mediusware.com/api/contacts/?search=${query}`);
            const data = await response.json();

            if (activeModal === "all") {
                setAllContacts(data.results);
            } else if (activeModal === "us") {
                setUsContacts(data.results);
            }

            setSearchQuery(query);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => handleButtonClickAndFetch('all', 'https://contact.mediusware.com/api/contacts/', setAllContacts)}>
                        All Contacts
                    </button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => handleButtonClickAndFetch('us', 'https://contact.mediusware.com/api/country-contacts/United%20States/', setUsContacts)}>
                        US Contacts
                    </button>
                </div>
                {showModal && (
                    <div className="modal active">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">{activeModal === 'all' ? 'All Contacts' : 'US Contacts'}</h5>
                                    <button className="btn btn-primary" onClick={() => handleButtonClickAndFetch('all', 'https://contact.mediusware.com/api/contacts/', setAllContacts)}>
                                        All Contacts
                                    </button>
                                    <button className="btn btn-warning" onClick={() => handleButtonClickAndFetch('us', 'https://contact.mediusware.com/api/country-contacts/United%20States/', setUsContacts)}>
                                        US Contacts
                                    </button>
                                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        placeholder="Search contacts..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn btn-primary" onClick={handleSearch}>
                                        Search
                                    </button>

                                    {filterEvenIdContacts(activeModal === 'all' ? allContacts : usContacts).map((contact) => (
                                        <h6 key={contact.id} onClick={() => handleContactClick(contact)}>
                                            {contact.phone}
                                        </h6>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <div className="form-check ml-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="showEvenIdContacts"
                                            checked={showEvenIdContacts}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" htmlFor="showEvenIdContacts">
                                            Show Even ID Contacts
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {showModal && activeModal === "details" && (
                <DetailsModal contact={selectedContact} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default Problem2;
