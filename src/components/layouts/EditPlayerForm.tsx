import React, { useEffect, useState } from 'react';

interface EditPlayerFormProps {
    editingUser: { id: string; nama: string; skor: number; url_foto: string } | null;
    onClose: () => void;
    onSave: (updatedUser: { id: string; nama: string; skor: number; url_foto: string }) => void;
}

const EditPlayerForm: React.FC<EditPlayerFormProps> = ({ editingUser, onClose, onSave }) => {
    const [formState, setFormState] = useState(editingUser);

    useEffect(() => {
        setFormState(editingUser); // Set ulang formState setiap kali editingUser berubah
    }, [editingUser]);

    if (!formState) {
        return null; // Jika tidak ada user yang sedang diedit, tidak render apa pun
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Player</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={formState.nama}
                    onChange={(e) => setFormState({ ...formState, nama: e.target.value })}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={formState.skor}
                    onChange={(e) => setFormState({ ...formState, skor: +e.target.value })}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={formState.url_foto}
                    onChange={(e) => setFormState({ ...formState, url_foto: e.target.value })}
                    className="border p-2 w-full mb-4"
                />
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose} // Tutup modal
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => onSave(formState)} // Simpan perubahan
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPlayerForm;
