import { Button, Card, CardBody, Dialog, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { X } from 'lucide-react';
import useAppContext from '../context/useAppContext';
import NoteTrueContentType from '../types/TrueContent';
import useNoteSharable from '../hooks/useNoteSharable';
import LoadingSpin from './LoadingSpin';
import EmptyContent from '../framer/EmptyContent';
import ApiQuery from '../api/query';

export interface NoteShareProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteTrueContentType;
}

function NoteShare({ open, setOpen, note }: NoteShareProps) {

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full dark:bg-secondary">
                <DialogHeader className="justify-between">
                    <Typography variant="h4" className="text-blue-gray-600 dark:text-blue-gray-400">
                        Share note
                    </Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <X />
                    </IconButton>
                </DialogHeader>
                <CardBody className="flex flex-col gap-4">
                    {open && <SharableContent note={note} />}
                </CardBody>
            </Card>
        </Dialog>
    )
}

export default NoteShare;

export interface SharableContentProps {
    note: NoteTrueContentType;
}

function SharableContent({ note }: SharableContentProps) {

    const [share, loading,] = useNoteSharable(note);

    const { user } = useAppContext();

    if (!user) return null;

    if (loading) return <LoadingSpin />;

    if (!share) return <EmptyContent set={(list) => list.unknown} />;

    return (
        <>
            <p>Note sharing is disabled. </p>
            <Button className="capitalize" variant="gradient" color="blue" onClick={() => {
                ApiQuery.shareNote(user, note, {
                    sharable: true,
                });
            }} fullWidth>Click to enable</Button>
        </>
    );
}