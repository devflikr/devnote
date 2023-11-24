import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { Grammar, highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";

export interface TextAreaProps {
    placeholder: string;
    onChange?: (content: string) => void;
    defaultValue?: string;
    language?: string;
    disabled?: boolean;
}

function TextArea({ placeholder, onChange, defaultValue = "", language = "plaintext", disabled }: TextAreaProps) {
    const [note, setNote] = useState<string>(defaultValue);

    useEffect(() => {
        onChange && onChange(note);
    }, [note, onChange]);

    const highlightWithLineNumbers = (input: string, lang: Grammar) => {
        return highlight(input, lang, language).split("\n").map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`).join("\n");
    }

    return (
        <Editor
            value={note}
            tabSize={4}
            onValueChange={code => setNote(code)}
            highlight={code => highlightWithLineNumbers(code, languages[language])}
            placeholder={placeholder}
            padding={10}
            autoFocus
            disabled={disabled}
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