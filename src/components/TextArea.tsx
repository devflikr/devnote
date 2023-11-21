import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { Grammar, highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export interface TextAreaProps {
    placeholder: string;
    onChange?: (content: string) => void;
    defaultValue?: string;
    language?: Grammar;
}

function TextArea({ placeholder, onChange, defaultValue = "" }: TextAreaProps) {
    const [note, setNote] = useState<string>(defaultValue);

    useEffect(() => {
        onChange && onChange(note);
    }, [note, onChange]);

    const highlightWithLineNumbers = (input: string, language: Grammar) => {
        return highlight(input, language, "").split("\n").map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`).join("\n");
    }

    return (
        <Editor
            value={note}
            tabSize={4}
            onValueChange={code => setNote(code)}
            highlight={code => highlightWithLineNumbers(code, languages.css)}
            placeholder={placeholder}
            padding={10}
            autoFocus
            textareaId="codeArea"
            className="editor"
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                outline: 0
            }}
        />
    )
}

export default TextArea;