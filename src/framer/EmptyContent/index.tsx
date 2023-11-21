import { Player } from '@lottiefiles/react-lottie-player';
import emptyAnimations from './emptyAnimations';

export interface EmptyContentProps {
    set: (animations: typeof emptyAnimations) => (typeof emptyAnimations)[keyof typeof emptyAnimations];
}

function EmptyContent({ set }: EmptyContentProps) {
    const data = set(emptyAnimations);
    return (
        <div className="flex-child flex-child-col flex-1 flex py-10 flex-col gap-10 justify-center">
            <Player
                src={data.animation}
                style={{
                    width: "100%",
                    maxWidth: "300px",
                    aspectRatio: "1 / 1",
                }}
                autoplay
                loop
            />
            <div className="text-center text-gray-500">{data.content}</div>
        </div>
    )
}

export default EmptyContent;