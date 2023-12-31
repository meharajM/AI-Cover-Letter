import { useCallback, useState } from 'react';

const Popup = () => {
  const [content, setContent] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [copy, setCopy] = useState(false);
  const [resume, setResume] = useState<string>(''); // state for resume
  const [error, setError] = useState<boolean>(false); // state for error

  const clickHandler = useCallback(() => {
    setLoader(true)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readPageContent', resume: resume }, (response) => { // send resume as part of message
        if (response.data) {
            setContent(response.data);
        } 
        if(response.error) {
            setError(true)
        }
        setLoader(false)
      });
    });
  }, [resume]); // add resume as dependency

  const onCopy = () => {
    navigator.clipboard.writeText(content); // use clipboard API to copy content
    setCopy(true)
  }

  return (
    <div className='w-300px p-4 bg-white shadow rounded relative'>
      {loader && 
        <div className='absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='loader text:gl text-white bold'>Generating cover</div>
        </div>
      }
      <textarea className='w-full p-2 border rounded' onChange={(e) => setResume(e.target.value)} placeholder="Paste resume here" /> {/* text area for resume */}
      <button className='w-full p-2 mt-2 bg-blue-500 text-white rounded' onClick={clickHandler}>Generate cover letter</button>
      {content && <div className='mt-2'>
        <div className='h-40 overflow-auto mt-2 p-2 border rounded text-black'>{content}</div>
        <button className='w-full p-2 mt-2 bg-green-500 text-white rounded' onClick={onCopy}>Copy</button>
        </div>}
        {copy && <div className='text-green-500'>copied</div>}
        {error && <div className='text-red-500'>There was an error with the API call. Please visit <a href='https://www.careered.ai/tool/cover-letter' target='_blank' rel='noopener noreferrer'>https://www.careered.ai/tool/cover-letter</a> and use it there at least once and come back and you can use this continuesly.</div>}
        <div className='mt-2 text-sm text-gray-500'>Powered by <a href='https://www.careered.ai' target='_blank' rel='noopener noreferrer'>www.careered.ai</a></div>
    </div>
  );
}

export default Popup;
