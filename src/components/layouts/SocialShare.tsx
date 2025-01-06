
interface Props {
    nama: string,
    skor: number,
}

const SocialShare: React.FC<Props> = (props: Props) => {
    const { nama, skor } = props
    const message = `Check out my score on the leaderboard! ${nama} : ${skor}`
    const url = encodeURIComponent(message)

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <a href={`https://wa.me/?text=${url}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
            </a>
            <a href={`https://t.me/share/url?text=${url}`} target="_blank" rel="noopener noreferrer">
                Telegram
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
                Facebook
            </a>
            <a href={`https://www.instagram.com/?text=${url}`} target="_blank" rel="noopener noreferrer">
                Instagram
            </a>
        </div>
    )
}

export default SocialShare