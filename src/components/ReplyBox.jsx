import React, { useContext , useState } from 'react'
import { AppContext } from './../context/AppContext';

export default function ReplyBox({comment}) {
    const {currentUser,AddReplyComment ,setIsReplyClicked} = useContext(AppContext)
    const [replyText, setreplyText] = useState('')
    const [show, setShow] = useState(true)
  return (
    
    <div className={`p-4 my-2 bg-white rounded-md ${show ? 'block' : 'hidden'}`}>
            <textarea onChange={(e) => {setreplyText(e.target.value)}} value={replyText} className='w-full border border-light_grayish_blue p-2 rounded-md focus:ring-2 focus:ring-moderate_blue focus:outline-0 ' placeholder='Add a comment ...'></textarea>
            <div className='flex items-center justify-between mt-3'>
                <img className='w-8 h-8' src={currentUser.image.png} alt="current-user-img" />
                <button onClick={() => {
                  if(!replyText) return
                  AddReplyComment(comment , replyText)
                  setreplyText('')
                  setShow(false)
                  setIsReplyClicked(false)
                }} className='bg-moderate_blue text-white py-1 px-4 rounded-md text-sm font-medium'>Send</button>
            </div>

    </div>
  )
}
