
interface SharableType {
    id: string;
    key: string;
    uid: string;

    isSharable: boolean;

    expiresAt?: Date;
    shareKey?: string;
    encryptionKey?: string;
}

export default SharableType;