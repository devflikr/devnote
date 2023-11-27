
import clipboard from "clipboardy";
import toast from "react-hot-toast";


function copyShareKey(key: string) {
    const text = `https://devnote.devflikr.com/s/${key}`;
    clipboard.write(text).then(() => {
        toast.success("Share link copied to clipboard");
    }).catch((e) => {
        toast.error("Failed to copy link");
        console.error(e);
    });
}

export default copyShareKey;