import React, { useContext ,useState } from 'react'
import Reply from './Reply'
import { AppContext } from './../context/AppContext';
import ReplyBox from './ReplyBox';
import Swal from 'sweetalert2'
export default function Comment({comment}) {
    const {currentUser ,DeleteComment } = useContext(AppContext)
    const [IsReplyClicked, setIsReplyClicked] = useState(false)
    const [IsEditMode , setIsEditMode] = useState(false)
    const [Upvoted, setUpVoted] = useState(false)
    const [Downvoted, setDownVoted] = useState(false)
    const [updateCommentText, setupdateCommentText] = useState(comment.content)
    const [score, setScore] = useState(comment.score)
    const UpVote = () => {
        if(!Upvoted){
            setScore(prev => prev + 1)
            setUpVoted(true)
            setDownVoted(false)
        }

    }
    const DownVote = () => {
        if(!Downvoted){
            
            if(score > 0){
                setScore(prev => prev -1)
                setDownVoted(true)
                setUpVoted(false)

            }
            
            
        }
    }
    const ConfirmDelete = () => {
        Swal.fire({
            title: 'Delete Comment',
            text: "Are you sure you want to delete this comment ? this will remove the comment and cant be undone",
            showCancelButton: true,
            confirmButtonColor: '#ed3b18',
            cancelButtonColor: '#333',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteComment(comment)
                
            }
          })
    }
  return (
    <div>
        <div className=' p-4 mb-4 bg-white rounded-md lg:flex lg:flex-row-reverse'>
            <div className='w-full'>
                {/* header */}
                <div className='flex items-center'>
                    <img className='w-8 h-8' src={comment.user.image.png} />
                    <p className='font-bold mx-4'>{comment.user.username}</p>
                    <span className='text-grayish_blue text-sm'>{comment.createdAt}</span>
                    <div className='ml-auto hidden lg:block'>
                        {comment.user.username === currentUser.username ? (
                            <div className='flex items-center'>
                                <div onClick={() => {ConfirmDelete()}} className='text-soft_red flex items-center mr-3 cursor-pointer hover:opacity-75'>
                                    <svg  className='mr-2' width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                                    <span>Delete</span>

                                </div>
                                <div onClick={() => {setIsEditMode(true)}}  className='text-moderate_blue flex items-center cursor-pointer hover:opacity-75 '>
                                    <svg className='mr-2' width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                                    <span>Edit</span>
                                </div>
                            </div>
                           

                        ) : (
                            <div onClick={() => {setIsReplyClicked(true)}} className='text-moderate_blue flex items-center cursor-pointer hover:opacity-75'>
                                <svg className = 'mr-2' width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <span>Reply</span>
                            </div>
                        )}
                    </div>
                    
                </div>
                {/* content */}
                <div className='my-3 text-dark_blue'>
                        {IsEditMode ? 
                                <div className='flex flex-col items-end'>
                                    <textarea value={updateCommentText} onChange={(e) => {setupdateCommentText(e.target.value)}} className='w-full h-[150px] border border-light_grayish_blue p-2 rounded-md focus:ring-2 focus:ring-moderate_blue focus:outline-0' ></textarea> 
                                    <button onClick={() => setIsEditMode(false)} className='bg-moderate_blue my-2 ml-auto text-white py-1 px-4 rounded-md text-sm font-medium'>UPDATE</button>

                                </div>
                                :
                                <>
                                    
                                    {updateCommentText}
                                </>
                            
                        }
                    
                </div>

            </div>
            
            {/* footer */}
            <div className='flex items-center justify-between lg:items-start lg:p-5  '>
                <div className='py-1 px-3 flex lg:flex-col lg:px-1 lg:py-2 lg:w-[40px] lg:h-[80px] items-center justify-between bg-light_gray w-[100px] rounded-md'>
                    <svg onClick={UpVote} className='fill-[#C5C6EF] hover:fill-moderate_blue cursor-pointer' width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" /></svg>
                    <span className='text-moderate_blue font-bold'>{score}</span>
                    <svg onClick={DownVote} className='fill-[#C5C6EF] hover:fill-moderate_blue cursor-pointer' width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" /></svg>

                </div>
                {
                    comment.user.username === currentUser.username ? (
                    <div className='flex items-center lg:hidden'>
                        <div onClick={() => {ConfirmDelete()}} className='text-soft_red flex items-center mr-3 cursor-pointer hover:opacity-75'>
                            <svg  className='mr-2' width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                            <span>Delete</span>

                        </div>
                        <div onClick={() => {setIsEditMode(true)}}  className='text-moderate_blue flex items-center cursor-pointer hover:opacity-75 '>
                            <svg className='mr-2' width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                            <span>Edit</span>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => {setIsReplyClicked(true)}} className='text-moderate_blue flex items-center cursor-pointer hover:opacity-75 lg:hidden'>
                        <svg className = 'mr-2' width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        <span>Reply</span>
                    </div>
                    

                )
            }
            </div>

        </div>
        {/* reply box */}
        <div>
            {
                IsReplyClicked ? (<ReplyBox comment={comment} setIsReplyClicked={setIsReplyClicked} />) : (null)
            }
        </div>

        <div className='border-l-2 border-l-light_gray'>
            {
                comment.replies.map(reply => {
                    return(
                        <Reply reply={reply}  /> 
                    )
                })
            }
        </div>
        
    </div>
    
    
  )
}
