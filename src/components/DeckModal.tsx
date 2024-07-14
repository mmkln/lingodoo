import React, { useState } from 'react';

type DeckModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, reminder: boolean) => void;
};

const DeckModal: React.FC<DeckModalProps> = ({ isOpen, onClose, onSave }) => {
    const [deckName, setDeckName] = useState('New Deck');
    const [reminder, setReminder] = useState(false);

    const handleSave = () => {
        onSave(deckName, reminder);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create Deck</h2>
                {/*<button className="text-red-500 border border-red-500 px-4 py-2 rounded-lg mb-4">Delete Deck</button>*/}
                <div className="mb-4">
                    <label className="block text-gray-700">Deck Name</label>
                    <input
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                    />
                </div>
                {/*<div className="mb-4">*/}
                {/*    <label className="block text-gray-700">Reminder Notification</label>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        className="mt-1"*/}
                {/*        checked={reminder}*/}
                {/*        onChange={(e) => setReminder(e.target.checked)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default DeckModal;
