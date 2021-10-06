import * as React from "react";
import { useQuery } from '@apollo/client';
import FileList from './FileList';
import Uploader from '../../components/Uploader';
import TextEditor from '../../components/TextEditor';
import VideoPlayer from "../../components/VideoPlayer";
import dynamic from 'next/dynamic';
import configData from "../../config";
import { USER_FILES_QUERY, PAGE_QUERY } from "../../utils/queries";
import { userFilesQuery } from "../../utils/types/userFilesQuery";
import { pageQuery } from "../../utils/types/pageQuery";
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    VKShareButton,
    VKIcon,
    WhatsappIcon,
    WhatsappShareButton
  } from "react-share";

const PlayerWithNoSSR = dynamic(() => import('../../components/AudioPlayer'), {
    ssr: false,
});

type SPProps = {
    sharedMode: boolean,
    previewMode: boolean,
    page_id: string,
    togglePreviewMode: () => void
}

const SinglePage = ({ sharedMode, previewMode, page_id, togglePreviewMode }: SPProps) => {
    const { loading, data, refetch } = useQuery<userFilesQuery>(USER_FILES_QUERY, {
        variables: { pageid: page_id }
    });

    const { loading: loadingPage, data: dataPage, refetch: refetchPage } = useQuery<pageQuery>(PAGE_QUERY, {
        variables: { pageid: page_id }
    });

    const shareURL = `${configData.APP_URL}/pages/${page_id}`;
    const baseStorageURL = configData.U_SERVER_URL;

    const [pageTitle, setPageTitle] = React.useState('');
    const [mediaState, setMediaState] = React.useState({
        audioList: [],
        videoList: [],
        mode: ''
    });

    const mapMediaData = data => {
        const audioList = [];
        const videoList = [];
        let mode = '';

        if (sharedMode || previewMode) {
            data.files.forEach(file => {
                if (file.type === 'video')
                    videoList.push({
                        name: file.filename.substring(file.filename.indexOf('-') + 1).split('.').slice(0, -1).join('.'),
                        src: `${baseStorageURL}/video/${file.page_id}/${file.filename}`,
                    });
                else
                    audioList.push({
                        name: file.filename.substring(file.filename.indexOf('-') + 1).split('.').slice(0, -1).join('.'),
                        musicSrc: `${baseStorageURL}/audio/${file.page_id}/${file.filename}`,
                    });
            });
            mode = 'present';
        } else {
            data.files.forEach(file => {
                if (file.type === 'video')
                    videoList.push(file);
                else
                    audioList.push(file);
            });
            mode = 'edit'
        }

        return {
            audioList,
            videoList,
            mode
        }
    }
    
    React.useEffect(() => {
        if (!loadingPage && dataPage) {
            setPageTitle(dataPage.page.name)
        }
    }, [loadingPage, dataPage]);

    React.useEffect(() => {
        if (!loading && data) {
            setMediaState(mapMediaData(data));
        }
    }, [loading, data, sharedMode, previewMode]);

    return (
        <section className="container px-5 py-6 mx-auto space-y-4">
            {!sharedMode && <header className="flex items-center justify-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">{previewMode ? pageTitle : 'Add content to the page'}</h2>
                <a onClick={togglePreviewMode} className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    {previewMode ? 'Edit' : 'Preview'}
                </a>
            </header>}

            {sharedMode && <header className="flex items-center justify-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">{pageTitle}</h2>
            </header>}

            <TextEditor previewMode={sharedMode || previewMode} page_id={page_id} />

            {mediaState.mode === 'edit' &&
                <>
                    {mediaState.audioList.length > 0 ?
                        <FileList files={mediaState.audioList} type='Audio' page_id={page_id} refetch={() => refetch()} />
                        :null}

                    {mediaState.videoList.length > 0 ?
                        <FileList files={mediaState.videoList} type='Video' page_id={page_id} refetch={() => refetch()} />
                        :null}

                    <Uploader page_id={page_id} refetch={() => refetch()} />
                </>}


            {mediaState.mode === 'present' &&
                <>
                    <VideoPlayer videoList={mediaState.videoList} />
                    <PlayerWithNoSSR audioList={mediaState.audioList} />
                </>}
            

            <header className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Share the page</h2>
            </header>
            <div className='flex space-x-2'>
                <FacebookShareButton
                    url={shareURL}
                    quote={`SharedLearning - ${pageTitle}`}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <WhatsappShareButton
                    url={shareURL}
                    title={`SharedLearning - ${pageTitle}`}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <VKShareButton
                    url={shareURL}
                    title={`SharedLearning - ${pageTitle}`}
                >
                    <VKIcon size={32} round />
                </VKShareButton>

                <TelegramShareButton
                    url={shareURL}
                    title={`SharedLearning - ${pageTitle}`}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
        </section>
    )
}

export default SinglePage;
