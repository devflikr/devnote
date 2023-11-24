import { Button, Card, CardBody, CardFooter, Dialog, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { X } from 'lucide-react';
import NoteTrueContentType from '../../types/TrueContent';
import LanguageSelector from '../../components/Language';
import { useState } from 'react';
import ApiQuery from '../../api/query';
import useAppContext from '../../context/useAppContext';
import toast from 'react-hot-toast';

export interface EditNotePropertiesProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteTrueContentType;
    refetch: () => void;
}

function EditNoteProperties({ open, setOpen, note, refetch }: EditNotePropertiesProps) {

    const handleOpen = () => setOpen((cur) => !cur);

    const { user } = useAppContext();

    const [title, setTitle] = useState<string>(note.title);
    const [language, setLanguage] = useState<string>(note.title);

    const handleSubmit = async () => {
        if (!user) return;
        handleOpen();
        const tid = toast.loading("Updating note properties");
        ApiQuery.updateNote(user, note, {
            language,
            title,
        }, tid).then(() => {
            toast.success("Note properties updated", { id: tid });
            refetch();
        });
    }

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
                        Note properties
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
                    <Typography className="text-black dark:text-white">
                        Note title
                    </Typography>
                    <input type="text" name="title" className="p-3 outline-none bg-slate-100 bg-gray-200 dark:bg-primary shadow rounded-lg  w-full mr-auto" placeholder="Note title..." value={title} autoFocus onChange={(e) => setTitle(e.target.value)} />
                    <Typography className="text-black dark:text-white">
                        Note language
                    </Typography>
                    <LanguageSelector setLang={(lang) => setLanguage(lang)} defaultValue={note.language} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="capitalize" variant="gradient" color="blue" onClick={handleSubmit} fullWidth>
                        Update properties
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
}

export default EditNoteProperties