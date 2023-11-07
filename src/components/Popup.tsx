import { useCallback, useState } from 'react';

const Popup = () => {
  const [content, setContent] = useState<string>('');

  const clickHandler = useCallback(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {

      chrome.tabs.sendMessage(tabs[0].id, { action: 'readPageContent' }, (response) => {
        console.log("response", response)
        setContent(response);
      });
    });
  }, []);

  return (
    <div className='w-300px'>
      <button onClick={clickHandler}>Get job details</button>
      {content && <div>{content}</div>}
    </div>
  );
}

export default Popup;
