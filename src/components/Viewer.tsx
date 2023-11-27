import { useEffect } from "react";

export interface ViewerProps {
    content: string;
    language?: string;
}
function Viewer({ content, language = "plaintext" }: ViewerProps) {

    useEffect(() => {
        window.Prism.highlightAll();
    }, [language]);

    return (
        <pre className="viewer-card line-numbers flex-1" style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            outline: 0
        }}>
            <code className={`outline-none language-${language}`} contentEditable={true} onCut={() => false} onPaste={() => false} onKeyDown={(e) => !!e.metaKey} suppressContentEditableWarning={true}>
                {content}
            </code>
        </pre>
    )
}

export default Viewer;