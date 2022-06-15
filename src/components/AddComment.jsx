import React, { useContext, useState } from 'react'
import { AppContext } from './../context/AppContext';

export default function AddComment() {
    const {currentUser,AddNewComment} = useContext(AppContext)
    const [commentText, setCommentText] = useState('')
    return (
        <div className='p-4 bg-white rounded-md'>
            <textarea onChange={(e) => {setCommentText(e.target.value)}} value={commentText} className='w-full lg:hidden border border-light_grayish_blue p-2 rounded-md focus:ring-2 focus:ring-moderate_blue focus:outline-0 ' placeholder='Add a comment ...'></textarea>
            <div className='flex items-center justify-between mt-3'>
                <img className='w-8 h-8' src={currentUser.image.png} alt="current-user-img" />
                <div className='hidden lg:block w-4/5'>
                    <textarea onChange={(e) => {setCommentText(e.target.value)}} value={commentText} className='w-full border border-light_grayish_blue p-2 rounded-md focus:ring-2 focus:ring-moderate_blue focus:outline-0 ' placeholder='Add a comment ...'></textarea>


                </div>
                <button onClick={() => {
                    if(!commentText)return
                    AddNewComment(commentText)
                    setCommentText('')

                }} className='bg-moderate_blue text-white py-1 px-4 rounded-md text-sm font-medium'>Send</button>
            </div>

        </div>
    )
}
