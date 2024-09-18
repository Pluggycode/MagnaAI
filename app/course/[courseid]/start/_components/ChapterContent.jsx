import { index } from 'drizzle-orm/mysql-core';
import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };


const ChapterContent = ({chapter,content}) => {
  return (
    <div className='p-10 '>
        <h2 className='font-medium text-2xl'>{chapter?.chapterName}</h2>
        <h2 className='text-gray-500'>{chapter?.about}</h2>

        {/* video */}
        <div className="flex justify-center my-6">
        <YouTube 
        videoId={content?.videoId}
        opts={opts}/>
        </div>
        <div className="">
            {content?.content?.map((item,index)=> (
                <div className="p-5 bg-green-50 mb-5 rounded-lg">
                    <h2 className='font-medium text-lg'>{item.title}</h2>
                    {/* <p className='whitespace-pre-wrap'>{item.description}</p> */}
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                   {item?.code && <div className="p-4 bg-black text-white rounded-md mt-3">
                    <pre>
                        <code>{item.code}</code>
                    </pre>
                    </div>}
                </div>

            ))}
        </div>
    {/* content */}
    </div>
  )
}

export default ChapterContent