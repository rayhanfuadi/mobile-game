import Image from "next/image"

const InstagramShareButton = () => {
    return (
        <a href="https://www.instagram.com" target="_blank">
            <Image src="/icons/instagram.svg" alt="instagram" width={32} height={32} />
        </a>
    )
}

export default InstagramShareButton