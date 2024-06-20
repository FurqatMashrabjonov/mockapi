import React, {useEffect} from "react";
import {PageProps} from "@/types";
import CodeFlask from "codeflask";
import Prism from 'prismjs';

export default function CodeViewer({code, language, auth}: PageProps<{
    code: string,
    language: string,
}>) {

    useEffect(() => {
        const flask = new CodeFlask('#editor',
            {
                language: 'python',
                readonly: true,
            });
        // flask.addLanguage('python', Prism.languages['python']);

        flask.updateCode(code);
    }, []);
    return (
            <div
                className="border rounded-lg position-relative w-full h-full overflow-auto"
                id="editor"></div>
    );
}
