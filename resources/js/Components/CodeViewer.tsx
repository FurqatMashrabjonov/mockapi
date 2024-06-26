import React, {useEffect} from "react";
import {PageProps} from "@/types";
import CodeFlask from "codeflask";
import Prism from 'prismjs';
import '@/Styles/prism-one-light.css' // Theme
export default function CodeViewer({code, language, auth}: PageProps<{
    code: string,
    language: string,
}>) {

    useEffect(() => {
        Prism.highlightAll();
        console.log(Prism.languages.php)
    }, []);

    return (
        <div className="">
        <pre>
          <code children={code} className={`language-${language}`}/>
        </pre>
        </div>
    );
}
