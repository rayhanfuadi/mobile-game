
interface Props {
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
        <div className="">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                <div className="bg-radial-primary p-6 rounded shadow-lg w-96 drop-shadow-form">
                    <div className="text-center grid gap-2">
                        <h2 className="text-xl font-bold">Edit Player</h2>
                        <p className="text-sm text-[#999] mb-4">Buat perubahan untuk profil anda disini. Klik save ketika kamu sudah selesai.</p>
                    </div>
                    <div className="grid gap-3">
                        <div className="grid grid-cols-12 gap-4 h-full">
                            <div className="col-span-3">
                                <p className="flex justify-end  items-center h-full">Nama</p>
                            </div>

                            <input
                                type="text"
                                placeholder="Name"
                                min={0}
                                max={100}
                                value={valueNama}
                                onChange={onChangeNama}
                                className="col-span-9 h-full border px-4 py-2 w-full mb-4 text-white bg-transparent rounded-lg focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-4 h-full">
                            <div className="col-span-3">
                                <p className="flex justify-end  items-center h-full">Skor</p>
                            </div>

                            <input
                                type="number"
                                placeholder="Skor"
                                value={valueSkor}
                                onChange={onChangeSkor}
                                className="col-span-9 h-full border px-4 py-2 w-full mb-4 text-white bg-transparent rounded-lg focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-4 h-full">
                            <div className="col-span-3">
                                <p className="flex justify-end  items-center h-full">Url Foto</p>
                            </div>

                            <input
                                type="text"
                                placeholder="Masukan URL"
                                value={valueUrl_foto}
                                onChange={onChangeUrl_foto}
                                className="col-span-9 h-full border px-4 py-2 w-full mb-4 text-white bg-transparent rounded-lg focus:outline-none"
                            />
                        </div>
                        <p className="text-sm text-[#999]">Photo URL: (silahkan masukan foto dari link address pinterset)</p>
                    </div>

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
        </div>
    )
}

export default EditPlayersForm

{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-radial-primary p-6 rounded shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Edit Player</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={valueNama}
                        onChange={onChangeNama}
                        className="border p-2 w-full mb-4 text-black"
                    />
                    <input
                        type="number"
                        placeholder="Score"
                        value={valueSkor}
                        min={0}
                        max={100}
                        onChange={onChangeSkor}
                        className="border p-2 w-full mb-4 text-black"
                    />
                    <p>Photo URL: (silahkan masukan foto dari link address pinterset)</p>
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={valueUrl_foto}
                        onChange={onChangeUrl_foto}
                        className="border p-2 w-full mb-4 text-black"
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
            </div> */}