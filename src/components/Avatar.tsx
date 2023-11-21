
export interface AvatarProps {
    src?: string;
    size?: string | number;
    alt?: string;
}
function Avatar({ src, size, alt }: AvatarProps) {
    return (
        <span className="overflow-hidden rounded-full border-[3px] border-blue-400 inline-block" style={{
            width: size,
            height: size,
        }}>
            <img src={src} alt={alt} />
        </span>
    )
}

export default Avatar