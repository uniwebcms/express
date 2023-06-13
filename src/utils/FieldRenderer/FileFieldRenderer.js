import React from 'react';
import { HiCloudDownload } from 'react-icons/hi';
import FileLogo from '../FileLogo';

export default function (props) {
    const { field, profile, withDownloadBtn = true, minH = 'min-h-full' } = props;

    const { value } = field;

    let filename = value || '';

    const { href, src, altText } = profile.getAssetInfo(value, true, filename);

    const basename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);

    const DownloadWrapper = ({ children }) => {
        return withDownloadBtn ? (
            <a
                href={href}
                target="_blank"
                download={basename}
                onClick={(e) => {
                    e.preventDefault();
                    downloadFile();
                }}
            >
                <HiCloudDownload
                    className={`text-blue-400 w-6 h-6 absolute top-3 right-3 invisible group-hover:visible`}
                />
                {children}
            </a>
        ) : (
            <>{children}</>
        );
    };

    const downloadFile = () => {
        fetch(href + '&download=true')
            .then((res) => res.json())
            .then((res) => {
                window.location.href = res;
            });
    };

    let backupImg = (
        <div className={`w-full h-full bg-white flex items-center justify-center`}>
            <FileLogo filename={basename} size="24"></FileLogo>
        </div>
    );

    const [markup, setMarkup] = React.useState(
        <div className={`h-full [overflow-y:overlay] relative flex items-center`}>
            <DownloadWrapper>
                <img
                    className={`max-w-full w-full ${minH}`}
                    src={src}
                    alt={altText}
                    onError={() => {
                        setMarkup(backupImg);
                    }}
                />
            </DownloadWrapper>
        </div>
    );

    return markup;
}
