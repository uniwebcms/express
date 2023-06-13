import * as React from 'react';
import Excel from './assets/excel.svg';
import Other from './assets/other.svg';
import Pdf from './assets/pdf.svg';
import Ppt from './assets/ppt.svg';
import Word from './assets/word.svg';
import Txt from './assets/txt.svg';
import HTML from './assets/html.svg';

export default function (props) {
    const { filename, size = '5' } = props;

    const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase();

    let Render;

    const isImg = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);

    if (isImg) return null;

    if (['xlsx', 'xlsm', 'xlsb', 'xls'].includes(ext)) {
        Render = Excel;
    } else if (ext === 'pdf') {
        Render = Pdf;
    } else if (ext === 'txt') {
        Render = Txt;
    } else if (ext === 'ppt' || ext === 'pptx') {
        Render = Ppt;
    } else if (ext === 'docx' || ext === 'doc') {
        Render = Word;
    } else if (ext === 'html') {
        Render = HTML;
    } else {
        Render = Other;
    }

    return <Render className={`w-${size} h-${size} flex-shrink-0`}></Render>;
}
