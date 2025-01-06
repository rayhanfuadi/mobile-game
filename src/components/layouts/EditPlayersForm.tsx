
interface Props {
    // value: { id: string; nama: string; skor: number; url_foto: string } | null
    // onChange: (value: { id: string; nama: string; skor: number; url_foto: string } | null) => void
    // onClick: () => void
    valueNama: string,
    onChangeNama: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueSkor: number,
    onChangeSkor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueUrl_foto: string,
    onChangeUrl_foto: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void
    setEditingUser: () => void
}

const EditPlayersForm: React.FC<Props> = (props: Props) => {
    const { valueNama, onChangeNama, valueSkor, onChangeSkor, valueUrl_foto, onChangeUrl_foto, setEditingUser, onClick } = props
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Player</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={valueNama}
                    onChange={onChangeNama}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={valueSkor}
                    onChange={onChangeSkor}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={valueUrl_foto}
                    onChange={onChangeUrl_foto}
                    className="border p-2 w-full mb-4"
                />
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={setEditingUser}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditPlayersForm



// < div className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" >
//     <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Edit Player</h2>
//         <input
//             type="text"
//             placeholder="Name"
//             value={editingUser.nama}
//             onChange={(e) => setEditingUser({ ...editingUser, nama: e.target.value })}
//             className="border p-2 w-full mb-4"
//         />
//         <input
//             type="number"
//             placeholder="Score"
//             value={editingUser.skor}
//             onChange={(e) => setEditingUser({ ...editingUser, skor: +e.target.value })}
//             className="border p-2 w-full mb-4"
//         />
//         <input
//             type="text"
//             placeholder="Photo URL"
//             value={editingUser.url_foto}
//             onChange={(e) => setEditingUser({ ...editingUser, url_foto: e.target.value })}
//             className="border p-2 w-full mb-4"
//         />
//         <div className="flex justify-end">
//             <button
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => setEditingUser(null)}
//             >
//                 Cancel
//             </button>
//             <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleEdit}
//             >
//                 Save
//             </button>
//         </div>
//     </div>
//     </ >