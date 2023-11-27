
import clipboard from "clipboardy";
import toast from "react-hot-toast";


function copyNoteContent(content: string) {
    clipboard.write(content).then(() => {
        toast.success("Note content copied to clipboard");
    }).catch((e) => {
        toast.error("Failed to copy content");
        console.error(e);
    });
}

export default copyNoteContent;