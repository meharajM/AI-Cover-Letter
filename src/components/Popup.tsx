import { useCallback, useState } from 'react';

const Popup = () => {
  const [content, setContent] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [copy, setCopy] = useState(false);
  const [resume, setResume] = useState<string>(''); // state for resume

  const clickHandler = useCallback(() => {
    setLoader(true)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readPageContent', resume: resume }, (response) => { // send resume as part of message
        console.log("response", response)
        setContent(response);
        setLoader(false)
      });
    });
  }, [resume]); // add resume as dependency

  const onCopy = () => {
    navigator.clipboard.writeText(content); // use clipboard API to copy content
    setCopy(true)
  }

  return (
    <div className='w-300px p-4 bg-white shadow rounded'>
      {loader && <div className='text-blue-500'>loading...</div>}
      
      <textarea className='w-full p-2 border rounded' onChange={(e) => setResume(e.target.value)} placeholder="Paste resume here" /> {/* text area for resume */}
      <button className='w-full p-2 mt-2 bg-blue-500 text-white rounded' onClick={clickHandler}>Generate cover letter</button>
      {content && <div className='mt-2'>
        
        <div className='h-40 overflow-auto mt-2 p-2 border rounded text-black'>{content}</div>
        <button className='w-full p-2 mt-2 bg-green-500 text-white rounded' onClick={onCopy}>Copy</button>
        </div>}
        {copy && <div className='text-green-500'>copied</div>}
    </div>
  );
}

export default Popup;
