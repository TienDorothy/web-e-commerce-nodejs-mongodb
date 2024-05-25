import React, { useState } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaUserSecret } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { RxFace } from 'react-icons/rx';
import { BsFillSendFill } from 'react-icons/bs';
const LiveChat = () => {
  // toggle open Live chat
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    setToggle(pre => !pre);
    console.log(toggle);
  };

  return (
    <>
      <div id='live-chat' className='fixed bottom-16 right-16 flex flex-col'>
        {toggle && (
          <div className='shadow-md rounded-2xl  w-[500px] h-[600px] relative bg-white'>
            <div className='font-bold p-4 flex-b-c border-b border-gray-700'>
              <p className='text-xl'>Customer Support</p>
              <p className='cursor-pointer px-3 py-2 bg-neutral-300 text-neutral-600 text-sm italic font-light'>
                Let's Chat App
              </p>
            </div>
            {/* chat */}
            <div id='chat' className='mr-10 '>
              <div className='chat chat-end flex flex-col gap-3'>
                <div className='p-3 italic chat-bubble-info'>Xin Chào</div>
                <div className='p-3 italic chat-bubble-info'>
                  Làm thế nào để xem các sản phẩm
                </div>
              </div>

              <div className='chat chat-start'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <FaUserSecret size={'40px'} />
                  </div>
                </div>
                <div className='p-3 italic bg-neutral-300 text-neutral-500'>
                  ADMIN: chào bạn
                </div>
              </div>
              <div className='chat chat-start'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <FaUserSecret size={'40px'} />
                  </div>
                </div>
                <div className='p-3 italic bg-neutral-300 text-neutral-500'>
                  ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
                </div>
              </div>

              {/* footer chat */}
              <div className='chat chat-start absolute bottom-0 left-0 right-0 mb-4 mr-10  border-t border-gray-700'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <FaUserSecret size={'40px'} />
                  </div>
                </div>
                <div className='flex-b-c w-full'>
                  <input
                    type='text'
                    placeholder='Enter Message!'
                    className='border-none '
                  />
                  <div className='icon text-xl flex gap-3'>
                    <ImAttachment /> <RxFace />{' '}
                    <BsFillSendFill color='#3ABFF8' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-end'>
          <button className='btn btn-circle mt-6 ' onClick={clickHandler}>
            <FaFacebookMessenger size={'32px'} />
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
