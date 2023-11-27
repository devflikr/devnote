
function generateNoteTitle(note: string) {
    let title = note.replace(/\s+/g, ' ');
    title = title.trim();
    title = title.substring(0, 64);
    return title.trim();
}

export default generateNoteTitle;